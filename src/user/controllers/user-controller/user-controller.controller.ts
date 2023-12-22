import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/service/auth/AuthGuard';
import { CreateUser } from 'src/user/Dtos/CreateUserDto';
import { UpdateUser } from 'src/user/Dtos/UpdateUserDto';
import { UserServiceService } from 'src/user/services/user-service/user-service.service';

@Controller('user-controller')
export class UserControllerController {

    constructor(private userService : UserServiceService){}
    @UseGuards(AuthGuard)
    @Post()
    async createUser (@Body() userBody : CreateUser){
        return await this.userService.createUser(userBody);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async UpdateUser (@Param("id") id : number , @Body() userBody : UpdateUser){
        return await this.userService.updateUser(id , userBody);
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser (@Param("id") id : number){
        return await this.userService.getUser(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    async getUsers (@Query('pageNo') pageNo : number , @Query('pageSize') pageSize : number){
        return await this.userService.getUsers(pageNo , pageSize);
    }

}
