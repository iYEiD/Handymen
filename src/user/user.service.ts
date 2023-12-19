import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.fullName = createUserDto.fullName;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    const createdUser = this.usersRepository.save(user).then((user) => {
      delete user.password;
      return user;
    });
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.find().then((users) =>
      users.map((user) => {
        delete user.password;
        return user;
      }),
    );
    return users;

  }

  findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOneBy({ id: id }).then((user) => {
      delete user.password;
      return user;
    });
    return user;

  }

  async updatePassword(id: number, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user && user.password === oldPassword && newPassword !== oldPassword) {
      user.password = newPassword;
      await this.usersRepository.update(id, user);
      return true;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {

    const user = await this.usersRepository.findOne({ where: { username: loginUserDto.username } });
    if (user && user.password === loginUserDto.password) {
      delete user.password;
      return user;
    }

    throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);

  }

}
