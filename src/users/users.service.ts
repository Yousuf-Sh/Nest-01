import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
            "role": "STAFF",
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

    getAll(role?: 'USER' | 'STAFF' | 'ADMIN'){
        if(!role){
            return this.users;
        }
        return this.users.filter(
            user => user.role === role
        );
    }
    show(id:number){
        if(!id){
            throw new HttpException('Bad Request',HttpStatus.BAD_REQUEST);
        }
        return this.users.filter(
            user => user.id===id
        );
    }
    store(user:{ name:string,email:string,role: 'USER' | 'STAFF' | 'ADMIN'}){
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
    update(id:number, updateUser:{ name:string,email:string,role: 'USER' | 'STAFF' | 'ADMIN'}){
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
