import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
     private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "USER",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "USER",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "USER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "USER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ];

   getAll(role?: 'USER' | 'STAFF' | 'ADMIN') {
    const allowedRoles = ['USER', 'STAFF', 'ADMIN'];

    if (!role) {
        return this.users;
    }

    if (role && !allowedRoles.includes(role)) {
        throw new HttpException(`Invalid role: ${role}`, HttpStatus.BAD_REQUEST);
    }

    const filteredUsers = this.users.filter(user => user.role === role);

    if (filteredUsers.length === 0) {
        throw new HttpException(`No users found with role: ${role}`, HttpStatus.NOT_FOUND);
    }

    return filteredUsers;
}
    show(id:number){
        if(!id){
            throw new HttpException('Bad Request',HttpStatus.BAD_REQUEST);
        }
        const user = this.users.find(
            user => user.id===id
        );
        if(!user) throw new NotFoundException(`User with id : ${id} does not exist.`);

        return user;
    }
    store(user:CreateUserDto){
    const byBiggestId = [...this.users].sort(
        (a,b)=> b.id - a.id
    );
    const newUser = {
            id : byBiggestId[0].id+1,
            name : user.name,
            email : user.email,
            role : user.role
        }
        this.users.push(newUser);
        return newUser;      
    }
    update(id:number, updateUser:UpdateUserDto){
        this.users = this.users.map(user=>{
            if(user.id === id){
                return {...user,...updateUser}
            }
            return user
        })
        return this.show(id)   
    }
    delete(id:number){
        const deletedUser = this.show(id);
        this.users = this.users.filter(user => user.id != id);
        return `deleted the following user : ${JSON.stringify(deletedUser)}`;
    }
}
