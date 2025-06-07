import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
interface ModelResponse {
    id: string;
    title: string;
    imageUrl: string;
    modelUrl: string;
    author: string;
    createdAt: Date;
}
export declare class ModelService {
    private modelRepository;
    constructor(modelRepository: Repository<Model>);
    getLatestModels(limit?: number): Promise<ModelResponse[]>;
    createModel(data: Partial<Model>): Promise<Model>;
}
export {};
