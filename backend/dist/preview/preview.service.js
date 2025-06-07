"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PreviewService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const fs_1 = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const temp_generate_photo_entity_1 = require("./entities/temp-generate-photo.entity");
const path = require("path");
const promts_1 = require("./promts");
const config_1 = require("@nestjs/config");
let PreviewService = PreviewService_1 = class PreviewService {
    constructor(configService, tempPhotoRepository) {
        this.configService = configService;
        this.tempPhotoRepository = tempPhotoRepository;
        this.uploadDir = 'uploads/temp-photos';
        this.referenceImagePath = 'uploads/reference/ref.png';
        this.logger = new common_1.Logger(PreviewService_1.name);
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const fs = require('fs');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async generateStarterPack(file) {
        try {
            const referenceImage = await (0, openai_1.toFile)((0, fs_1.createReadStream)(this.referenceImagePath), null, {
                type: 'image/png'
            });
            const userImage = await (0, openai_1.toFile)(file.buffer, null, {
                type: file.mimetype,
            });
            const response = await this.openai.images.edit({
                model: 'gpt-image-1',
                size: "1024x1024",
                image: userImage,
                prompt: promts_1.PROMPT_PHOTO,
            });
            if (!response.data?.[0]?.b64_json) {
                throw new Error('No image data in response');
            }
            const file_name = `temp_${Date.now()}.png`;
            const imageBytes = Buffer.from(response.data[0].b64_json, 'base64');
            const tempFilePath = path.join(this.uploadDir, file_name);
            (0, fs_1.writeFileSync)(tempFilePath, imageBytes);
            const formData = new FormData();
            formData.append('file', new Blob([imageBytes], { type: 'image/png' }));
            return {
                file_name: file_name,
                file_path: tempFilePath,
            };
        }
        catch (err) {
            console.log('Image Generation Error:', err.response?.data || err.message);
            throw new Error('Ошибка при генерации стартер пака');
        }
    }
    async create(file) {
        try {
            if (!file || !file.buffer) {
                throw new Error('Файл не предоставлен');
            }
            if (!file.mimetype.startsWith('image/')) {
                throw new Error('Файл должен быть изображением');
            }
            console.log('Starting starter pack generation...');
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
        }
        catch (error) {
            console.error('Error creating starter pack:', error);
            return {
                success: false,
                error: error.message,
            };
        }
    }
    async getTempPhoto(id) {
        try {
            if (!id || typeof id !== 'number') {
                throw new Error('Invalid ID provided');
            }
            const fileData = await this.tempPhotoRepository.findOne({ where: { id } });
            if (!fileData) {
                throw new Error('Photo not found');
            }
            if (!fileData.file_name) {
                throw new Error('File name is missing');
            }
            if (!process.env.API_URL) {
                throw new Error('API_URL environment variable is not set');
            }
            return {
                success: true,
                data: {
                    url_image: `${process.env.API_URL}/uploads/temp-photos/${fileData.file_name}`
                }
            };
        }
        catch (error) {
            console.error('Error getting temp photo:', error);
            return {
                success: false,
                error: error.message || 'Failed to get photo'
            };
        }
    }
    async getLatestPhotos(limit = 6) {
        const photos = await this.tempPhotoRepository.find({
            order: {
                created_at: 'DESC'
            },
            take: limit
        });
        return photos.map(photo => ({
            id: photo.id,
            title: photo.file_name,
            imageUrl: `${process.env.API_URL}/uploads/temp-photos/${photo.file_name}`,
            createdAt: photo.created_at
        }));
    }
};
exports.PreviewService = PreviewService;
exports.PreviewService = PreviewService = PreviewService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(temp_generate_photo_entity_1.TempGeneratePhoto)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], PreviewService);
//# sourceMappingURL=preview.service.js.map