import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dtos';
import Serilize from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserSigninDto } from './dtos/user-signin.dtos copy';

@Controller('auth')
@Serilize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.userService.create(body);

    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: UserSigninDto, @Session() session: any) {
    const user = await this.userService.signin(body);

    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('who')
  @UseGuards(AuthGuard)
  async who(@Session() session: any) {
    const user = await this.userService.findUserById(session.userId);
    return user;
  }
}
