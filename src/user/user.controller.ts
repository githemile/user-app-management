import { Body, Controller, Delete, Get, Param, Post , Patch} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { NotificationService } from "src/Notification/notification.service";



@Controller('user')
export class UserController{
    constructor (private readonly userService: UserService,
        private readonly notificationService: NotificationService
      ){

    }

    @Post( )
   async create(@Body() user: User){
  
    

   
      const newUser = await this.userService.createNotification(user);  
      return {message : 'User added successfully' , user : newUser};
   }
    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id : number): Promise<User | undefined>{
        return this.userService.IdFind(id);
    }

    // @Get(':firstName/:lastName')
    // findOneByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string) : Promise<User>{
    //     return this.userService.findOneByName(firstName, lastName);
    // }

    @Patch(':id')
    async udpate(@Param('id') id: number ,  @Body() user: User){
        const updatedUser = await  this.userService.updatedNotification(id , user);
       
        return {message : 'User updated', user : updatedUser};
    }


    @Delete(':id')
        async   remove (@Param('id') id: number ) {  {
         
           
                    const userDeleted = await  this.userService.deleteNotification(id);
                    return   {message : 'User deleted success', userDeleted : userDeleted};                                        
          
       
    }
}

    


}