import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_PAD,
  SWAGGER_TITTLE,
  SWAGGER_VERSION,
} from './constants/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // const reflector = app.get(Reflector);
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITTLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PAD, app, document);

  await app.listen(process.env.PORT || 8000);

  console.log('-------------------------------------');
  console.log(`READY ON: ${await app.getUrl()}`);
  console.log('-------------------------------------');
}
bootstrap();
