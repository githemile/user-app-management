import { Body, Controller, Delete, Get, Param, Post , Patch} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { NotificationService } from "src/userAction/notification.service";



@Controller('user')
export class UserController{
    constructor (private readonly userService: UserService,
        private readonly notificationService: NotificationService
      ){

    }

    @Post( )
   async create(@Body() user: User){
  this.userService.create(user);

   
      const newUser = await this.userService.create(user);  
      return {message : 'User added successfully' , user : newUser};
   }
    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id : number): Promise<User | undefined>{
        return this.userService.findOneById(id);
    }

    // @Get(':firstName/:lastName')
    // findOneByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string) : Promise<User>{
    //     return this.userService.findOneByName(firstName, lastName);
    // }

    @Patch(':id')
    async udpate(@Param('id') id: number ,  @Body() user: User){
        const updatedUser = await  this.userService.update(id , user);
         // Créer automatiquement une notification pour la mise à jour de l'utilisateur
    const notificationMessage = `${user.firstname} updated`;
    await this.notificationService.createNotification(updatedUser, notificationMessage);
        return {message : 'User updated', user : updatedUser};
    }


    @Delete(':id')
        async   remove(@Param('id') id: number  , user : User ) : Promise<void> {
        const deleteUser = await  this.userService.remove(id);
        // Créer automatiquement une notification pour la mise à jour de l'utilisateur
   const notificationMessage = `${user.firstname} deleted`;
    this.notificationService.createNotification(deleteUser, notificationMessage);

    }

    


}