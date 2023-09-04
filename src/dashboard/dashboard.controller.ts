import { Controller, Get, Post } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  dashboard() {
    return 'DASHBOARD';
  }
}
