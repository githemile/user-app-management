import { Controller, Get } from "@nestjs/common";
import { NotifictionEntity } from "./notification.entity";
import {  InternalServerErrorException } from "@nestjs/common";
import { NotificationService } from "./notification.service";



@Controller('user-actions')
export class NotificationController{ 
    constructor (private readonly notificationService :   NotificationService){
    }
    @Get()
    findAll(): Promise<NotifictionEntity[]>{
        try{
            return this.notificationService.findAll();
            
        } catch (error) {
            throw new InternalServerErrorException('notification not found');
        }
    }

  

}