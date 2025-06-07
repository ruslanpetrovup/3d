"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const createFile = async (file, userId, category, path) => {
    try {
        if (!file) {
            throw new common_1.BadRequestException('File was not uploaded');
        }
        const allowedTypes = [
            'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv',
            'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/midi', 'audio/x-midi',
            'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp',
            'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/octet-stream'
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Unsupported file type');
        }
        let sanitizedFileName = file.originalname
            .replace(/_/g, '-')
            .replace(/_+/g, '-')
            .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\-\. ]/g, '')
            .replace(/\s+/g, '-');
        const ext = (0, path_1.extname)(sanitizedFileName);
        const baseName = `${userId}_${category}_${sanitizedFileName.replace(ext, '')}`;
        let fileName = baseName;
        let counter = 1;
        const uploadPath = path ? path : 'uploads';
        try {
            await fs_1.promises.access(uploadPath);
        }
        catch {
            await fs_1.promises.mkdir(uploadPath, { recursive: true });
        }
        while (true) {
            try {
                await fs_1.promises.access(`${uploadPath}/${fileName}${ext}`);
                fileName = `${baseName}.${counter}${ext}`;
                counter++;
            }
            catch {
                break;
            }
        }
        const filePath = `${uploadPath}/${fileName}${ext}`;
        await fs_1.promises.writeFile(filePath, file.buffer);
        return fileName + ext;
    }
    catch (error) {
        console.error('Error creating file:', error);
        throw new common_1.BadRequestException('An error occurred while uploading the file');
    }
};
exports.createFile = createFile;
//# sourceMappingURL=createFile.js.map