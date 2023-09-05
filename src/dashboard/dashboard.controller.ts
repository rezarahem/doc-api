import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateDocDto } from './dtos/create-doc.dto';
import { DashboardService } from './dashboard.service';
import { DocDto } from './dtos/doc.dto';
import { UserService } from 'src/user/user.service';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/core/guards/roles.guard';
import Serilize from 'src/core/interceptors/serialize.interceptor';

@Controller('dashboard')
@UseGuards(RolesGuard)
@Serilize(DocDto)
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
  ) {}

  @Post('post')
  @Roles(Role.AUTHOR, Role.ADMIN)
  async postDoc(@Body() body: CreateDocDto, @Session() session: any) {
    return await this.dashboardService.createDoc(body, session.userId);
  }

  @Get('my-docs')
  @Roles(Role.AUTHOR, Role.ADMIN)
  async getAllUserDocs(@Session() session: any) {
    const user = await this.userService.findUserById(session.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.dashboardService.getAllUserDocs(user.id);
  }

  @Get('docs')
  getAllDocs() {
    return this.dashboardService.getAllDocs();
  }

  // @Post('/:id')
  // getDocById() {}

  // @Patch('/:id')
  // editDoc() {}

  // @Delete('/:id')
  // removeDoc() {}
}
