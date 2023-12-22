import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserServiceService } from 'src/user/services/user-service/user-service.service';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepo : Repository<User> ,
     private jwtService : JwtService,
     private userService : UserServiceService){}

    async signIn(email : string , password : string){

        const user = await this.userService.findUserByEmail(email);
        console.log(user)
        if(user?.password != password){
            throw new UnauthorizedException('sorry user not authorize')
        }
        const payload = { sub : user.id , username : user.email};
        return {
            'access-token': await this.jwtService.signAsync(payload)
        }
    }

}
