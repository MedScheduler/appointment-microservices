import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function startSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('API de controle de usuários')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  startSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
