import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repo: ReturnType<typeof mockRepository>;

  beforeEach(() => {
    repo = mockRepository();
    service = new UserService(repo as any);
  });

  describe('create', () => {
    it('should create a user when email does not exist', async () => {
      repo.findOne.mockResolvedValue(undefined);
      repo.create.mockReturnValue({} as User);
      repo.save.mockResolvedValue({ id: '1' } as User);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');

      const dto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      };
      const result = await service.create(dto);
      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashed',
      });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });

    it('should throw ConflictException if email exists', async () => {
      repo.findOne.mockResolvedValue({ id: '1' });
      const dto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      };
      await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return user when found', async () => {
      repo.findOne.mockResolvedValue({ id: '1' });
      const result = await service.findOne('1');
      expect(result).toEqual({ id: '1' });
    });

    it('should throw NotFoundException when not found', async () => {
      repo.findOne.mockResolvedValue(undefined);
      await expect(service.findOne('1')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('should hash password and save', async () => {
      const user = { id: '1', password: 'old' } as User;
      repo.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');
      repo.save.mockResolvedValue({ ...user, password: 'hashed' });

      const dto: UpdateUserDto = { password: 'new' } as any;
      const result = await service.update('1', dto);
      expect(result.password).toBe('hashed');
      expect(repo.save).toHaveBeenCalledWith({ ...user, password: 'hashed' });
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = { id: '1' } as User;
      repo.findOne.mockResolvedValue(user);
      await service.remove('1');
      expect(repo.remove).toHaveBeenCalledWith(user);
    });
  });

  describe('getLatestModels', () => {
    it('should return mapped models', async () => {
      const users = [
        { id: '1', firstName: 'a', lastName: 'b', modelTitle: 't', modelImageUrl: 'img', modelUrl: 'url', createdAt: new Date() },
      ];
      repo.find.mockResolvedValue(users);
      const result = await service.getLatestModels(1);
      expect(result[0]).toMatchObject({
        id: '1',
        firstName: 'a',
        lastName: 'b',
        modelTitle: 't',
        modelImageUrl: 'img',
        modelUrl: 'url',
      });
    });
  });
});
