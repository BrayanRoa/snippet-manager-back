import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  // USED TO VALIDATE REQUEST BODIES
  app.useGlobalPipes(new ValidationPipe());

  // USED TO INTERCEPT AND MODIFY RESPONSES
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  // SWAGGER CONFIGURATION
  const config = new DocumentBuilder()
    .setTitle('Snippet Manager API')
    .setDescription('API para gestionar snippets de código')
    .setVersion('1.0')
    .addBearerAuth() // Para usar JWT más adelante
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Disponible en /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
