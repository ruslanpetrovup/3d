import { Injectable, Logger } from "@nestjs/common";
import OpenAI, { toFile } from "openai";
import { writeFileSync, createReadStream } from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TempGeneratePhoto } from "./entities/temp-generate-photo.entity";
import * as path from "path";
import { PROMPT_PHOTO } from "./promts";
import { LatestPhoto } from "./interfaces/preview.interface";
import { ConfigService } from "@nestjs/config";
import { OrderNotificationService } from "../order-notification/order-notification.service";

@Injectable()
export class PreviewService {
  private readonly openai: OpenAI;
  private readonly uploadDir = "uploads/temp-photos";
  private readonly referenceImagePath = "uploads/reference/ref.png";
  private readonly logger = new Logger(PreviewService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TempGeneratePhoto)
    private readonly tempPhotoRepository: Repository<TempGeneratePhoto>,
    private readonly notificationService: OrderNotificationService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const fs = require("fs");
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private async generateStarterPack(
    file: Express.Multer.File
  ): Promise<{ file_name: string; file_path: string }> {
    try {
      const referenceImage = await toFile(
        createReadStream(this.referenceImagePath),
        null,
        {
          type: "image/png",
        }
      );

      const userImage = await toFile(file.buffer, null, {
        type: file.mimetype,
      });

      const response = await this.openai.images.edit({
        model: "gpt-image-1",
        size: "1024x1024",
        image: userImage,
        prompt: PROMPT_PHOTO,
      });

      if (!response.data?.[0]?.b64_json) {
        throw new Error("No image data in response");
      }

      const file_name = `temp_${Date.now()}.png`;
      const imageBytes = Buffer.from(response.data[0].b64_json, "base64");
      const tempFilePath = path.join(this.uploadDir, file_name);
      writeFileSync(tempFilePath, imageBytes);

      const formData = new FormData();
      formData.append("file", new Blob([imageBytes], { type: "image/png" }));

      return {
        file_name: file_name,
        file_path: tempFilePath,
      };
    } catch (err) {
      console.log("Image Generation Error:", err.response?.data || err.message);
      throw new Error("Ошибка при генерации стартер пака");
    }
  }

  async create(file: Express.Multer.File) {
    try {
      if (!file || !file.buffer) {
        throw new Error("Файл не предоставлен");
      }

      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Файл должен быть изображением");
      }

      console.log("Starting starter pack generation...");
      const fileSizeKb = (file.size / 1024).toFixed(1);
      const fileType = file.mimetype.split("/")[1] || "unknown";
      const timestamp = new Date().toLocaleString("uk-UA");

      const message = `🎨 *Новая генерация стартового пака!*\n
👤 Пользователь: неизвестен
🕓 Время: ${timestamp}
🖼️ Файл: ${file.originalname}
📦 Тип: ${fileType.toUpperCase()}
📏 Размер: ${fileSizeKb} KB
⏳ Генерация запущена...`;
      await this.notificationService.sendMessageToSubscribers(message);

      const { file_name, file_path } = await this.generateStarterPack(file);

      const tempPhoto = this.tempPhotoRepository.create({
        file_name: file_name,
        file_path: file_path,
      });
      await this.tempPhotoRepository.save(tempPhoto);

      return {
        success: true,
        data: {
          id: tempPhoto.id,
          url: `${process.env.API_URL}/preview/temp-photos/${tempPhoto.id}`,
        },
      };
    } catch (error) {
      console.error("Error creating starter pack:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getTempPhoto(id: number) {
    try {
      if (!id || typeof id !== "number") {
        throw new Error("Invalid ID provided");
      }

      const fileData = await this.tempPhotoRepository.findOne({
        where: { id },
      });

      if (!fileData) {
        throw new Error("Photo not found");
      }

      if (!fileData.file_name) {
        throw new Error("File name is missing");
      }

      if (!process.env.API_URL) {
        throw new Error("API_URL environment variable is not set");
      }

      return {
        success: true,
        data: {
          url_image: `${process.env.API_URL}/uploads/temp-photos/${fileData.file_name}`,
        },
      };
    } catch (error) {
      console.error("Error getting temp photo:", error);
      return {
        success: false,
        error: error.message || "Failed to get photo",
      };
    }
  }

  async getLatestPhotos(limit: number = 6): Promise<LatestPhoto[]> {
    const photos = await this.tempPhotoRepository.find({
      order: {
        created_at: "DESC",
      },
      take: limit,
    });

    return photos.map((photo) => ({
      id: photo.id,
      title: photo.file_name,
      imageUrl: `${process.env.API_URL}/uploads/temp-photos/${photo.file_name}`,
      createdAt: photo.created_at,
    }));
  }
}
