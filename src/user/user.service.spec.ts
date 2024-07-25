import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                }
            ]
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));


    });
    describe('findAll', () => {
        it('should return  User[ ]', async () => {
            const expectedResult: any = [];
            jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);
            const result = await service.findAll();
            expect(result).toEqual(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return User', async () => {
            const expectedResult: any = {};
            jest.spyOn(repository, 'findOneBy').mockImplementation(() => expectedResult);
            const result = await service.findOne(1);
            if (expectedResult) {
                expect(result).toEqual(expectedResult);
            } else {
                expect(service.update(2, expectedResult)).toEqual('user not found');
            }
        });
    });

    describe('create', () => {
        it('should be create new user', async () => {
            const expectedResult: any = {};
            jest.spyOn(repository, 'save').mockImplementation(() => expectedResult);
            const result = await service.create(expectedResult);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('update', () => {
        it('should be return User with update data', async () => {
            const param: number = 2;
            const expectedResult: any = {
                firstName: 'Anna',
                lastName: 'anna.anyan@gmail.com',
            };
            jest.spyOn(repository, 'findOneBy').mockImplementation(() => expectedResult);
            if (expectedResult) {
                const result = jest.spyOn(repository, 'update').mockReturnValue(undefined);
                await service.update(param, expectedResult);
                expect(result).toHaveBeenCalledWith(param, expectedResult);
            } else {
                expect(service.update(param, expectedResult)).toEqual('user not found');
            }
        });
    });

    describe('delete', () => {
        it('should be delete user', async () => {
            const expectedResult: any = {};
            jest
                .spyOn(repository, 'findOneBy')
                .mockImplementation(() => expectedResult);
            if (expectedResult) {
                jest
                    .spyOn(repository, 'delete')
                    .mockImplementation(() => expectedResult);
                const result = await service.remove(1);
                expect(result).toEqual(true);
            } else {
                expect(service.remove(1)).toEqual(false);
            }
        });
    });
    
});