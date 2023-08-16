import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { NotificationModule } from "src/userAction/notification.module";
import { NotificationService } from "src/userAction/notification.service";
import { NotifictionEntity } from "src/userAction/notification.entity";


@Module(
    {
        imports : [TypeOrmModule.forFeature([User, NotifictionEntity]) , NotificationModule],
        controllers: [UserController],
        providers: [UserService , NotificationService],
      

    }
)

export class UserModule {
  
}