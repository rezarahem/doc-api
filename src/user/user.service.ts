import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserSigninDto } from './dtos/user-signin.dtos copy';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ userName, email, password }: CreateUserDto) {
    const hashPassword = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          userName,
          email,
          hashPassword,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email in use');
        }
      }

      throw error;
    }
  }

  async signin({ email, password }: UserSigninDto) {
    const [user] = await this.prisma.user.findMany({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const pwMatches = await argon.verify(user.hashPassword, password);

    if (!pwMatches) throw new ForbiddenException('invalid credentials');

    return user;
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    // switch (user.role) {
    //   case 'USER':
    //     console.log('user');
    //     break;
    //   case 'AUTHOR':
    //     console.log('author');
    //     break;
    //   case 'ADMIN':
    //     console.log('admin');
    //     break;
    //   default:
    //     console.log('guest');
    // }

    return user;
  }
}