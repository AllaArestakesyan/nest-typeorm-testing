import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },]

    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  describe('GET', () => {
    it('should return an array of users', async () => {
      const expectedResult: any = [];
      jest.spyOn(userService, 'findAll').mockImplementation(() => expectedResult);
      const result = await controller.findAll();
      expect(result).toBe(expectedResult);
    });
  });

  describe('GET/:id', () => {
    it('should be return an object of user', async () => {
      const newResult: any = {};
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(newResult);
      const result = await controller.findOne("1");
      return expect(result).toBe(newResult);
    });
  });

  describe('POST', () => {
    it('should be add new user', async () => {
      const newResult: any = {
        "firstName": "Anna",
        "lastName": "Anyan",
        "email": "anna.anyan@gmail.com",
        "age": 18,
        "role": "0"
      };
      jest.spyOn(userService, 'create').mockImplementation(() => newResult);
      const result = await controller.create(newResult);
      expect(result).toEqual(newResult);

    });
  });

  describe('PATCH', () => {
    it('should be updated correct user', async () => {
      const newuser: any = {};
      jest.spyOn(userService, 'update').mockImplementation(() => newuser);
      const result = await controller.update("1", newuser);
      expect(result).toEqual(newuser);
    });
  });

  describe('DELETE', () => {
    it('should be delete correct user', async () => {
      const deleteuser: any = {};
      jest.spyOn(userService, 'remove').mockImplementation(() => deleteuser);
      const result = await controller.remove("1");
      expect(result).toEqual(deleteuser);
    });
  });
});
