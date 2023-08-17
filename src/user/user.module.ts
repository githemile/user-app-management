import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { NotificationModule } from "src/Notification/notification.module";
import { NotificationService } from "src/Notification/notification.service";
import { NotifictionEntity } from "src/Notification/notification.entity";


@Module(
    {
        imports : [TypeOrmModule.forFeature([User, NotifictionEntity]) , NotificationModule],
        controllers: [UserController],
        providers: [UserService , NotificationService],
      

    }
)

export class UserModule {
  
}