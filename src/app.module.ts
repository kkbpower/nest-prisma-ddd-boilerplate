import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { PrismaModule } from './infrastructure/config/prisma/prisma.module';
import UserRepository from './domain/user/repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    UserRepository,
  ],
})
export class AppModule {}
