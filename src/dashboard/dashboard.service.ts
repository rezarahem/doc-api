import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocDto } from './dtos/create-doc.dto';
import { User } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async createDoc(body: CreateDocDto, userId: string) {
    return await this.prisma.document.create({
      data: {
        userId,
        ...body,
      },
    });
  }

  getAllUserDocs(userId: string) {
    return this.prisma.document.findMany({
      where: {
        userId,
      },
    });
  }

  getAllDocs() {
    return this.prisma.document.findMany();
  }

  // getDocById ?

  //   async findUserById(id: string) {
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //     if (!user) throw new NotFoundException('User not found');
  //     switch (user.role) {
  //       case 'USER':
  //         console.log('user');
  //         break;
  //       case 'AUTHOR':
  //         console.log('author');
  //         break;
  //       case 'ADMIN':
  //         console.log('admin');
  //         break;
  //       default:
  //         console.log('guest');
  //     }
  //     return user;
  //   }
}
