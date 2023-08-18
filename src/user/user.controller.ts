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
      return {message : `User ${user.firstname} added successfully` , user : newUser};
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
       
        return {message : `User updated by firstname = ${user.firstname}   lastname = ${user.lastname}  age = ${user.age}`, user : updatedUser};
    }


    @Delete(':id')
        async   remove (@Param('id') id: number ) {  {
         
                        const user = await new User();
                        
           
                    const userDeleted = await  this.userService.deleteNotification(id);
                    
                    return   {message : `User ${id} deleted success`, userDeleted : userDeleted};                                        
          
       
    }
}

    


}