import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { User } from 'src/typeorm/User';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './service/auth/AuthGuard';

@Module({
  imports:[UserModule , 
    JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: { expiresIn: '600s' },
  }),TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
  exports :[AuthModule]
})
export class AuthModule {

}
