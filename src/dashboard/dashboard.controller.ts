import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import Serilize from 'src/interceptors/serialize.interceptor';
import { CreateDocDto } from './dtos/create-doc.dto';
import { DashboardService } from './dashboard.service';
import { DocDto } from './dtos/doc.dto';
import { UserService } from 'src/user/user.service';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from '@prisma/client';

@Controller('dashboard')
@Serilize(DocDto)

export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
  ) {}

  @Post('post')
  // @Roles(Role.ADMIN)
  async postDoc(@Body() body: CreateDocDto, @Session() session: any) {
    return await this.dashboardService.createDoc(body, session.userId);
  }

  @Get('my-docs')
  async getAllDocs(@Session() session: any) {
    const user = await this.userService.findUserById(session.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.dashboardService.getAllDocs(user.id);
  }

  // @Post('/:id')
  // getDocById() {}

  // @Patch('/:id')
  // editDoc() {}

  // @Delete('/:id')
  // removeDoc() {}
}
