import { Module } from '@nestjs/common';
import { UserControllerController } from './controllers/user-controller/user-controller.controller';
import { UserServiceService } from './services/user-service/user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/service/auth/AuthGuard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerController],
  providers: [UserServiceService],
  exports : [UserServiceService]
})
export class UserModule {}
