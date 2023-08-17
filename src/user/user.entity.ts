import { NotifictionEntity } from "src/Notification/notification.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname : string;

    @Column()
    lastname: string;

    @Column()
    age : number;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

      // ... d'autres propriétés de l'utilisateur

  @OneToMany(() => NotifictionEntity, notification => notification.user)
  notifications: Notification[];
}