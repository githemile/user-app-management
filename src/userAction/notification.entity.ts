import { User } from "src/user/user.entity";
import {  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('notification')
export class NotifictionEntity{
    @PrimaryGeneratedColumn()
    id : number; 

    @Column()
    action : string; // pour la creation , la mise a jour et la suspression
 
    @ManyToOne(() => User , user => user.notifications)
    user : User;
    // @Column({type : 'int'})
    // userId : number;

    @CreateDateColumn()
    createdAt : Date;

    

   



  
    


}