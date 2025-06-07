import { Repository } from 'typeorm';
import { TempGeneratePhoto } from './entities/temp-generate-photo.entity';
import { LatestPhoto } from './interfaces/preview.interface';
import { ConfigService } from '@nestjs/config';
export declare class PreviewService {
    private readonly configService;
    private readonly tempPhotoRepository;
    private readonly openai;
    private readonly uploadDir;
    private readonly referenceImagePath;
    private readonly logger;
    constructor(configService: ConfigService, tempPhotoRepository: Repository<TempGeneratePhoto>);
    private generateStarterPack;
    create(file: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            id: number;
            url: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    getTempPhoto(id: number): Promise<{
        success: boolean;
        data: {
            url_image: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    getLatestPhotos(limit?: number): Promise<LatestPhoto[]>;
}
