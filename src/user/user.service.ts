import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { NotificationService } from "src/userAction/notification.service";



@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
    private userRepository: Repository<User>,
    private notificationService : NotificationService){}

    async create(user: User ){
        try {
            
            const createdUser = await this.userRepository.save(user);
            // Enregistrer une notification automatiquement 
            const notificationMessage  = `${user.firstname} created`;
            this.notificationService.createNotification(createdUser, notificationMessage);
          return createdUser;
        } catch (error) {
            throw new InternalServerErrorException("Could not create user");

        }
    }

    async findAll(){
       
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new InternalServerErrorException("Not found user");

        }
    }

    // async findOneById(id: number): Promise<User | undefined>{
    //     return this.userRepository.findOne();
    // }

    async findOneById(id: number){
        try {
           const myId =   await this.userRepository.findOneById(id);
           return myId;
       
    } catch (error) {
        throw new InternalServerErrorException("Not found user by id: " + id);

    }
    }

    // async findOneBy(firstName: string, lastName: string){
    //     return await  this.userRepository.findOneBy({firstName : firstName, lastName : lastName});
    // }

   
    async  update(id:number , user: User ): Promise<User>{
  
        try {
          const users = await this.userRepository.findOneById(id);
          if(!user){
            throw new Error('User not found');
          }
        //   mise a jour des champs
        if(users.firstname){
            users.firstname = user.firstname;
        }
        if(users.lastname){
            users.lastname = user.lastname;
        }
        if(users.age){
            users.age = user.age;
        }

        return this.userRepository.save(users);

        } catch (error) {
            throw new InternalServerErrorException("not updated user ");

        }
    
        
    }

    async remove(id:number  ): Promise<User>{
        try {
           const user =  await this.userRepository.findOneById(id);
            if(!user){
                throw new Error('User not found');
            }

            // Supprimer l'utilisateur de la base de donnée
           await this.userRepository.delete(id);
            return user;
        } catch (error) {
          throw new InternalServerErrorException('not deleted user')
        }
    }

}