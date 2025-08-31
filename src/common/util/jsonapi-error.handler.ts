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

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = exception.getResponse?.();

    let title = 'Error';
    let detail = '';
    let source = undefined;

    if (
      typeof responseBody === 'object' &&
      responseBody.message &&
      responseBody.errors
    ) {
      // Caso del ValidationPipe con exceptionFactory personalizado
      title = responseBody.message;
      detail = JSON.stringify(responseBody.errors, null, 2);
      source = { pointer: responseBody.errors };
    } else if (typeof responseBody === 'string') {
      detail = responseBody;
    }

    const error = new Error({
      status,
      title,
      detail,
      source,
    });

    response.status(status).json(error);
  }
}
