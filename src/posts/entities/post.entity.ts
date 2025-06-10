import { Tag } from "src/tags/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    title:string

    @Column({type:'text'})
    content:string

    @ManyToOne(() => User,user=>user.posts,({onDelete:'CASCADE'}))
    user:User

    @ManyToMany(()=> Tag,{
        cascade:true,eager:true,onDelete:'CASCADE'
    })
    @JoinTable()
    tags: Tag[]; 
}
