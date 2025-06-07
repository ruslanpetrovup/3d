import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TempGeneratePhoto } from './entities/temp-generate-photo.entity';
import * as path from 'path';
import axios from 'axios';
import { PROMPT_PHOTO, PROMPT_USER } from './promts';

@Injectable()
export class PreviewService {
  private readonly openai: OpenAI;

  private readonly basePrompt = PROMPT_PHOTO;

  private readonly uploadDir = 'uploads/temp-photos';

  constructor(
    @InjectRepository(TempGeneratePhoto)
    private tempPhotoRepository: Repository<TempGeneratePhoto>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(file: Express.Multer.File) {
    try {
      const gptResponse = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: PROMPT_USER,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
                },
              },
            ],
          },
        ],
        max_tokens: 400,
      });

      const gptGeneratedPrompt = gptResponse.choices[0].message.content.trim();
      console.log('GPT response:', gptGeneratedPrompt);

      if (!gptGeneratedPrompt) {
        throw new Error('GPT не зміг згенерувати опис.');
      }

      // Разделяем описание куклы и аксессуары
      const [description, accessoriesPart] = gptGeneratedPrompt.split(
        'As accessories, include:',
      );
      const accessories = accessoriesPart
        ? accessoriesPart.trim()
        : 'a plain book, a simple cup, a basic necklace';

      // Формируем финальный промпт
      const finalPrompt = PROMPT_PHOTO.replace(
        '[DESCRIPTION]',
        description,
      ).replace('[ACCESSORIES]', accessories);

      // Генерируем изображение с DALL-E
      const dalleResponse = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: finalPrompt,
        n: 1,
        size: '1024x1024',
        style: 'vivid',
      });

      const generatedImageUrl = dalleResponse.data[0].url;

      const response = await axios.get(generatedImageUrl, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(response.data);

      const fileName = `generated_${Date.now()}.png`;
      const filePath = path.join(this.uploadDir, fileName);
      writeFileSync(filePath, buffer);

      const tempPhoto = this.tempPhotoRepository.create({
        file_name: fileName,
        file_path: filePath,
      });
      await this.tempPhotoRepository.save(tempPhoto);

      return {
        success: true,
        generatedImageUrl,
        fileData: {
          id: tempPhoto.id,
          url: `/api/preview/temp-photos/${fileName}`,
        },
        promptUsed: finalPrompt,
      };
    } catch (error) {
      console.error('Error processing image:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
