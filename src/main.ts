/* eslint-disable prettier/prettier */
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from './metadata';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

    // enable class validation
    app.useGlobalPipes(
      new ValidationPipe({
          exceptionFactory: (errors) => new BadRequestException(errors),
          whitelist: true,
          transform: true,
          enableDebugMessages: true,
      }),
  );

  
  const config = new DocumentBuilder()
  .addBearerAuth({
      scheme: 'bearer',
      type: 'http',
      in: 'header',
      bearerFormat: 'JWT',
  })
  .setTitle('POS365 API')
  .setDescription('The POS365 API Documentation')
  .setVersion('1.0')
  .build();

await SwaggerModule.loadPluginMetadata(metadata);

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('docs', app, document);

//await app.listen(process.env.PORT || 8000);

await app.listen(3000);
}
bootstrap();