import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'jsonapi-serializer';

@Catch()
export class JsonApiErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = new Error({
      status,
      title: exception.message,
      detail: exception.message,
      source:
        exception.options && Object.keys(exception.options).length > 0
          ? { pointer: exception.options }
          : undefined,
    });

    response.status(status).json(error);
  }
}
