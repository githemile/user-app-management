import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { NotificationModule } from './Notification/notification.module';
import { NotifictionEntity } from './Notification/notification.entity';


@Module({
  imports: [
    UserModule,
    NotificationModule, 
  //connexion a la base de donnée
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // L'hôte de votre base de données
    port: 5432, // Le port par défaut de PostgreSQL ou mysql
    username: 'postgres', //
    password: 'postgres', // Le password par défaut de PostgreSQL
    database: 'userManagementApp', //
    entities: [User , NotifictionEntity], // Liste des entités (tables) de votre base de données
    synchronize: true, // Cette option crée automatiquement les tables si elles n'existent pas (attention en production)
  }),

 

  


  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
  
}
