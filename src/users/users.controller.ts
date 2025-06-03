import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { get } from 'http';

@Controller('users')
export class UsersController {
    @Get()
    allUsers(@Query('role') role: 'USER'|'ADMIN'){
        if(!role){
            return 'All users';
        }
        return 'user with role '+role 
    }
    @Get(':id')
    showUser(@Param('id') id: string){
        return `User with id : ${id}`;
    }
    @Post()
    createUser(@Body() user:{}){
        return user;
    }
    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() userUpdate:{}){
        return {id, ...userUpdate};
    }
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return `Deleted user with id ${id}`;
    }
}
