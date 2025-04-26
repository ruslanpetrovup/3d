import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { Request } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Защита HTTP заголовков
  app.use(helmet());

  // Настройка CORS
  app.enableCors({
    origin: ['http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // app.use(
  //   rateLimit({
  //     windowMs: 5 * 60 * 1000,
  //     max: 100,
  //     standardHeaders: true,
  //     legacyHeaders: false,
  //   }),
  // );

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // }));
  app.use(passport.initialize());
  app.use('/payment/webhook', bodyParser.raw({ 
    type: 'application/json',
    limit: '500mb'
  }));
  app.use(bodyParser.json({ 
    limit: '500mb',
    verify: (req: Request, res, buf) => {
      if (req.originalUrl === '/payment/webhook' || req.originalUrl === '/sumsub/webhook') {
        (req as any).rawBody = buf;
      }
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation LilYou')
    .setDescription('API endpoints for the backend LilYou')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001);
}
bootstrap();
