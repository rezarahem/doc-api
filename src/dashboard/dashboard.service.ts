import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
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
