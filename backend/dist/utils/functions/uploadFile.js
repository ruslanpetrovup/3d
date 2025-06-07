"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const uploadFile = async (file, userId) => {
    try {
        if (!file) {
            throw new common_1.BadRequestException('Файл не был загружен');
        }
        const allowedTypes = [
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            'video/x-ms-wmv',
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/midi',
            'audio/x-midi',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Неподдерживаемый тип файла');
        }
        try {
            await fs_1.promises.access('uploads');
        }
        catch {
            await fs_1.promises.mkdir('uploads');
        }
        const baseFileName = `${userId}_${file.originalname}`;
        let fileName = baseFileName;
        let counter = 1;
        while (true) {
            try {
                await fs_1.promises.access(`uploads/${fileName}`);
                const ext = (0, path_1.extname)(baseFileName);
                const nameWithoutExt = baseFileName.slice(0, -ext.length);
                fileName = `${nameWithoutExt}_${counter}${ext}`;
                counter++;
            }
            catch {
                break;
            }
        }
        try {
            await fs_1.promises.unlink(`uploads/${baseFileName}`);
        }
        catch {
        }
        await fs_1.promises.writeFile(`uploads/${fileName}`, file.buffer);
        return fileName;
    }
    catch (error) {
        throw new common_1.BadRequestException('Произошла ошибка при обновлении файла');
    }
};
exports.default = uploadFile;
//# sourceMappingURL=uploadFile.js.map