"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const deleteFile = async (fileName) => {
    try {
        if (!fileName) {
            throw new common_1.BadRequestException('Filename is not specified');
        }
        const filePath = `uploads/users-files/${fileName}`;
        try {
            await fs_1.promises.access(filePath);
        }
        catch {
            throw new common_1.BadRequestException('File not found');
        }
        await fs_1.promises.unlink(filePath);
    }
    catch (error) {
        if (error instanceof common_1.BadRequestException) {
            throw error;
        }
        throw new common_1.BadRequestException('Error occurred while deleting file');
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=deleteFile.js.map