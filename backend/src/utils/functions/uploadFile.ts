import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { promises as fs } from 'fs';

const uploadFile = async (file: Express.Multer.File, userId: string): Promise<string> => {
  try {
    // Проверяем наличие файла
    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    // Разрешенные типы файлов
    const allowedTypes = [
      // Видео
      'video/mp4',
      'video/mpeg', 
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv',
      
      // Музыка
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/midi',
      'audio/x-midi',
      
      // Фото
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/bmp',
      'image/webp',
      
      // Документы
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/vnd.ms-excel', // xls
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/vnd.ms-powerpoint', // ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation' // pptx
    ];

    // Проверяем тип файла
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Неподдерживаемый тип файла');
    }

    // Проверяем существование директории uploads
    try {
      await fs.access('uploads');
    } catch {
      await fs.mkdir('uploads');
    }

    // Создаем имя файла с ID пользователя
    const baseFileName = `${userId}_${file.originalname}`;
    let fileName = baseFileName;
    let counter = 1;

    // Проверяем существование файла и добавляем счетчик если нужно
    while (true) {
      try {
        await fs.access(`uploads/${fileName}`);
        // Если файл существует, добавляем счетчик к имени
        const ext = extname(baseFileName);
        const nameWithoutExt = baseFileName.slice(0, -ext.length);
        fileName = `${nameWithoutExt}_${counter}${ext}`;
        counter++;
      } catch {
        // Файл не существует, можно использовать это имя
        break;
      }
    }

    // Удаляем старый файл если он существует
    try {
      await fs.unlink(`uploads/${baseFileName}`);
    } catch {
      // Игнорируем ошибку если файл не существует
    }

    // Сохраняем новый файл
    await fs.writeFile(`uploads/${fileName}`, file.buffer);

    return fileName;

  } catch (error) {
    throw new BadRequestException('Произошла ошибка при обновлении файла');
  }
};

export default uploadFile;