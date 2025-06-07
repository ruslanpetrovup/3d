import { PreviewService } from './preview.service';
import { LatestPhoto } from './interfaces/preview.interface';
export declare class PreviewController {
    private readonly previewService;
    constructor(previewService: PreviewService);
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
    serveFile(id: string): Promise<{
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
