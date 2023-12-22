import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { CreateUser } from 'src/user/Dtos/CreateUserDto';
import { UpdateUser } from 'src/user/Dtos/UpdateUserDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>){}

    async createUser(createUser : CreateUser){
         return await this.userRepository.save(createUser);
    }

    async getUser(id : number){
        return await this.userRepository.findOne({where: { id : id } });
   }

   async updateUser(id : number , updateUser : UpdateUser){

    const existUser  = await this.userRepository.findOne( { where : {id : id } })
    if(existUser == null) throw new NotFoundException("User not Found");

    await this.userRepository.update(id ,updateUser);
    return await this.userRepository.findOne( { where : {id : id } })
}



   async getUsers(pageNo : number , pageSize : number){
    const offset : number = (pageNo - 1) * pageSize;
    const [users , total] = await this.userRepository.findAndCount({skip : offset , take : pageSize})
    return {data : users , count : total};
}

    
    findUserByEmail(email : string){
        return this.userRepository.findOne({where:{email : email}});    
        }
    
}
