import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface UserWithModel {
    id: string;
    firstName: string;
    lastName: string;
    modelTitle: string;
    modelImageUrl: string;
    modelUrl: string;
    createdAt: Date;
}
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    getLatestModels(limit?: number): Promise<UserWithModel[]>;
}
export {};
