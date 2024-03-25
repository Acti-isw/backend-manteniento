import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_PAD,
  SWAGGER_TITTLE,
  SWAGGER_VERSION,
} from './constants/swagger';
import { CORS } from './constants/cors';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{rawBody:true});
  

  app.enableCors(CORS);

  app.setGlobalPrefix('api/');

  // Aumentar el límite de tamaño de la entidad de solicitud a 50 MB (o el tamaño que desees)
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITTLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PAD, app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 8000);

  console.log('-------------------------------------');
  console.log(`READY ON: ${await app.getUrl()}`);
  console.log('-------------------------------------');
}
bootstrap();
