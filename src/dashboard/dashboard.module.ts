import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, UserService],
})
export class DashboardModule {}
