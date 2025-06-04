import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,ParseIntPipe,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    allUsers(@Query('role') role?:UserRole){
        return this.userService.getAll(role); 
    }
    @Get(':id')
    showUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.show(id); 
    }
    @Post()
    createUser(@Body(ValidationPipe) user:CreateUserDto){
        return this.userService.store(user);
    }
    @Patch(':id')
    updateUser(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.userService.update(id,userUpdate);
    }@Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id);
    }
}
