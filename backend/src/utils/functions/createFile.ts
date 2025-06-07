import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import { BadRequestException } from '@nestjs/common';

export const createFile = async (file: Express.Multer.File, userId: string, category: string,path?:string): Promise<string> => {
  try {
    // Check if file exists
    if (!file) {
      throw new BadRequestException('File was not uploaded');
    }
    // Allowed file types
    const allowedTypes = [
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv',
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/midi', 'audio/x-midi',
      'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp',
      'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/vnd.ms-excel', // xls
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/vnd.ms-powerpoint', // ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
      'application/octet-stream'
    ];

    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Unsupported file type');
    }

    // Sanitize filename: replace all "_" with "-" and multiple hyphens with single one
    let sanitizedFileName = file.originalname
      .replace(/_/g, '-')  // Replace all underscores with hyphens
      .replace(/_+/g, '-') // Replace multiple hyphens with single one
      .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\-\. ]/g, '')  // Keep only allowed characters
      .replace(/\s+/g, '-'); // Replace spaces with underscores

    // Get file extension
    const ext = extname(sanitizedFileName);

    // Form filename
    const baseName = `${userId}_${category}_${sanitizedFileName.replace(ext, '')}`; // User ID + category + filename without extension
    let fileName = baseName;
    let counter = 1;

    const uploadPath = path ? path : 'uploads';

    // Create directory if it doesn't exist
    try {
      await fs.access(uploadPath);
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }

    // Check if file exists and add counter if needed
    while (true) {
      try {
        await fs.access(`${uploadPath}/${fileName}${ext}`);
        // If file exists, add counter to name
        fileName = `${baseName}.${counter}${ext}`;
        counter++;
      } catch {
        // File doesn't exist, can use this name
        break;
      }
    }

    // File save path
    const filePath = `${uploadPath}/${fileName}${ext}`;

    // Save file
    await fs.writeFile(filePath, file.buffer);

    return fileName + ext;

  } catch (error) {
    console.error('Error creating file:', error);
    throw new BadRequestException('An error occurred while uploading the file');
  }
}
