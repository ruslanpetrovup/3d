import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
interface UserWithModel {
    id: string;
    firstName: string;
    lastName: string;
    modelTitle: string;
    modelImageUrl: string;
    modelUrl: string;
    createdAt: Date;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    getLatestModels(limit?: number): Promise<UserWithModel[]>;
}
export {};
