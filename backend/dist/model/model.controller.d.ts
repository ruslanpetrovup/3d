import { ModelService } from './model.service';
interface ModelResponse {
    id: string;
    title: string;
    imageUrl: string;
    modelUrl: string;
    author: string;
    createdAt: Date;
}
export declare class ModelController {
    private readonly modelService;
    constructor(modelService: ModelService);
    getLatestModels(limit?: number): Promise<ModelResponse[]>;
}
export {};
