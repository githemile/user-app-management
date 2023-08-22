import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserEntity } from './user/entities/user.entity/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User example')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config ,);
  SwaggerModule.setup('user', app, document , );
  await app.listen(3000);
}
bootstrap();
