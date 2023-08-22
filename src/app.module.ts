import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SwaggerModule } from '@nestjs/swagger';
@Module({
  imports: [NotificationModule , 
    UserModule,
    SwaggerModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  
  ],

  controllers: [AppController ],
  providers: [AppService ],
  exports: [AppService],
})
export class AppModule {}
