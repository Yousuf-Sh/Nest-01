import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({type:'varchar'})
    email: string;
    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;

    @CreateDateColumn({type:'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}