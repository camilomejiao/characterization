import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ConsoleLogger,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
//import { setupSwagger } from './common/util/setup-swagger';

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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const extractErrors = (validationErrors, parentPath = '') => {
          let result = [];

          for (const err of validationErrors) {
            const fieldPath = parentPath
              ? `${parentPath}.${err.property}`
              : err.property;

            if (err.constraints) {
              result.push({
                field: fieldPath,
                errors: Object.values(err.constraints),
              });
            }

            if (err.children?.length) {
              result = result.concat(extractErrors(err.children, fieldPath));
            }
          }

          console.log(result);

          return result;
        };

        const formattedErrors = extractErrors(errors);

        return new BadRequestException({
          message: 'Errores de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  //setupSwagger(app);

  await app.listen(3800);
}
bootstrap();
