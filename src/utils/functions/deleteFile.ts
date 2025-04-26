import { BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';

export const deleteFile = async (fileName: string): Promise<void> => {
  try {
    // Check if filename exists
    if (!fileName) {
      throw new BadRequestException('Filename is not specified');
    }

    // File path
    const filePath = `uploads/users-files/${fileName}`;

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      throw new BadRequestException('File not found');
    }

    // Delete file
    await fs.unlink(filePath);

  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new BadRequestException('Error occurred while deleting file');
  }
}