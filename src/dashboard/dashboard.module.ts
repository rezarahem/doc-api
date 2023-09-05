import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  controllers: [DashboardController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    DashboardService,
    UserService,
  ],
})
export class DashboardModule {}
