import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotifictionEntity } from "./notification.entity";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";


@Module({
    imports : [TypeOrmModule.forFeature([NotifictionEntity])],
    controllers: [NotificationController],
    providers : [NotificationService],
    exports : [NotificationService]
   
})

export class NotificationModule{

}