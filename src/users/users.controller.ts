import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,ParseIntPipe,ValidationPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { upload_directory } from 'src/common/constansts';
import { checkFileType, getFilename } from 'src/common/fileUtils';

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
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                filename: getFilename,
                destination: upload_directory+'/users',

            }),
            fileFilter: checkFileType,
        })
    )
    async createUser(@Body(ValidationPipe) user:CreateUserDto,
        @UploadedFile() file: Express.Multer.File)
    {
        console.log(file.filename);
        return this.userService.store(user,file);
    }

    @Patch(':id')
    updateUser(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.userService.update(id,userUpdate);
    }
    
    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id);
    }
}
