import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    allUsers(@Query('role') role?: 'USER'|'ADMIN'){
        return this.userService.getAll(role); 
    }
    @Get(':id')
    showUser(@Param('id') id: string){
        return this.userService.show(+id); //unary plus to cast id from string to num
    }
    @Post()
    createUser(@Body() user:{ name:string,email:string,role: 'USER' | 'STAFF' | 'ADMIN'}){
        return this.userService.store(user);
    }
    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() userUpdate:{ name:string,email:string,role: 'USER' | 'STAFF' | 'ADMIN'}){
        return this.userService.update(+id,userUpdate);
    }
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.delete(+id);
    }
}
