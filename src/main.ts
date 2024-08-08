import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/util/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(),
    snapshot: true,
  });

  app.enableCors();

  app.setGlobalPrefix('characterization/api/v1', {
    exclude: [
      {
        path: 'characterization/health',
        method: RequestMethod.GET,
      },
    ],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
