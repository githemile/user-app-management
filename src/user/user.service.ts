import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository , EntityManager } from "typeorm";
import { User } from "./user.entity";
import { NotificationService } from "src/Notification/notification.service";



@Injectable()
export class UserService{
    constructor(
        
     
        @InjectRepository(User)
    private userRepository: Repository<User>,
    private notificationService : NotificationService,
    private readonly entityManager : EntityManager,
    @InjectRepository(User)
    private userService: Repository<UserService>){}

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
    //     return this.userRepository.findOneById(id);
    // }

    async IdFind(id: number){
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
          const userId = await this.IdFind(id);
          if(!user){
            throw new Error('User not found');
          }
        //   mise a jour des champs
        if(userId.firstname){
            userId.firstname = user.firstname;
        }
        if(userId.lastname){
            userId.lastname = user.lastname;
        }
        if(userId.age){
            userId.age = user.age;
        }

        return this.userRepository.save(userId);

        } catch (error) {
            throw new InternalServerErrorException("not updated user ");

        }
    
        
    }
    async updatedNotification(id: number , updateData : Partial<User>): Promise<User> {
        try {
        return await this.entityManager.transaction(async transactionalEntityManager => {
            const userId = await transactionalEntityManager.findOneById(User, id);
            
            if (!userId) {
              throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'a pas été trouvé`);
            }
          
            //   mise a jour des champs
            await transactionalEntityManager.merge(User , userId , updateData);

            // mettre a jour  user
          const result =   await transactionalEntityManager.save(userId);
    
            const notificationMessage = `${userId.firstname} deleted`;
            await this.notificationService.createNotification(userId ,notificationMessage);
            return result;
          });
        } catch (error) { 
            console.log(error);
          throw new InternalServerErrorException('Une erreur est survenue lors de la suppression de l\'utilisateur');
         

          
        }
      }
    async remove(id:number ): Promise<User>{
       

        const userId =  await this.IdFind(id);
        if(!userId){
            throw new Error('User not found');
        }
        try {

            // Supprimer l'utilisateur de la base de donnée
            return   this.userRepository.remove(userId);
     
       

        } catch (error) {
          throw new InternalServerErrorException('not deleted user')
        }
    }

  
    async deleteNotification(id: number  ): Promise<void> {
        try {
        return await this.entityManager.transaction(async transactionalEntityManager => {
            const userToDelete = await transactionalEntityManager.findOneById(User, id);
            
            if (!userToDelete) {
              throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'a pas été trouvé`);
            }
          
           
            await transactionalEntityManager.remove(userToDelete);
    
            const notificationMessage = `${userToDelete.firstname} deleted`;
            await this.notificationService.createNotification(userToDelete ,notificationMessage);
          });
        } catch (error) { 
            console.log(error);
          throw new InternalServerErrorException('Une erreur est survenue lors de la suppression de l\'utilisateur');
         

          
        }
      }
    async createNotification(user:User) : Promise<User>{
        try {
        return await this.entityManager.transaction(async transactionalEntityManager => {
             const createdUser = await transactionalEntityManager.save(User ,user);
            // Enregistrer une notification automatiquement 
            const notificationMessage  = `${user.firstname} created`;
          await  this.notificationService.createNotification(createdUser, notificationMessage);
           return createdUser;
          });
        } catch (error) { 
            console.log(error);
          throw new InternalServerErrorException('Une erreur est survenue lors de la suppression de l\'utilisateur');
         

          
        }
      }

    
    

    
    
    
    
    

}
