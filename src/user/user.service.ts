import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto)
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user
    } else {
      throw new NotFoundException("user not found")
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return await this.usersRepository.update(id, updateUserDto)
    } else {
      throw new NotFoundException("user not found")
    }
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      await this.usersRepository.delete(id)
      return true;
    } else {
      return false;
    }
  }
}
