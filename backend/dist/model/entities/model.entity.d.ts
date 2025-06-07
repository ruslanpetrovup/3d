import { User } from '../../user/entities/user.entity';
export declare class Model {
    id: string;
    title: string;
    imageUrl: string;
    modelUrl: string;
    author: User;
    createdAt: Date;
}
