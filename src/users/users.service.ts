import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { upload_directory } from 'src/common/constansts';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}
   

   async getAll(role?: UserRole) {
    const allowedRoles = Object.values(UserRole);

    if (role && !allowedRoles.includes(role)) {
        throw new HttpException(`Invalid role: ${role}`, HttpStatus.BAD_REQUEST);
    }

    const users = role
        ? await this.userRepository.find({ where: { role } })
        : await this.userRepository.find();

    if (users.length === 0) {
        const roleMsg = role ? ` with role: ${role}` : '';
        throw new HttpException(`No users found${roleMsg}`, HttpStatus.NOT_FOUND);
    }

    return users;
    }

   async show(id:number){
        if(!id){
            throw new HttpException('Bad Request',HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findOne({
            where:{id},
            relations:['posts.tags'],
        });
        if(!user) throw new NotFoundException(`User with id : ${id} does not exist.`);

        return user;
    }
   async findByEmail(email:string){
        if(!email){
            throw new HttpException('Bad Request',HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findOne({
            where:{email: email},
            loadEagerRelations: false
        });
        if(!user) throw new NotFoundException(`User with id : ${email} does not exist.`);

        return user;
    }
    async store(user:CreateUserDto,file: Express.Multer.File){
        const newUser = new User();
        
        try{

            newUser.name=user.name;
            newUser.email=user.email;
            newUser.role=user.role;
            newUser.image_url = file?  '/uploads/users/'+file.filename : null;
            newUser.password= user.password;
            const createdUser = await this.userRepository.save(newUser);

            return createdUser;      
        }catch(error){

            console.error('user creation failed :',error.sqlMessage+'\n'+error.sql)
            throw new InternalServerErrorException('user creation failed');
        }
    }
    async update(id:number, updateUser:UpdateUserDto){
        try{
        await this.userRepository.update({id},updateUser);
        const updatedData = await this.userRepository.findOneBy({id});

        return updatedData;
       }catch(e){
            console.error('Error occured while trying to update user : ',e.sqlMessage+'\n'+e.sql)
            throw new InternalServerErrorException(e.sqlMessage);
       }
    }
    async delete(id:number){
        
        try{
            await this.userRepository.delete(id);
            return `deleted the user with id : ${id}`;
        }catch(e){
            console.error('Failed to delete user:',e.sqlMessage+'\n'+e.sql);
            throw new InternalServerErrorException(e.sqlMessage);
        }
    }
}
