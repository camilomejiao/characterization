import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();

    // 1) Si YA viene con `errors` → lo respetamos tal cual
    if (typeof body === 'object' && (body as any).errors) {
      return res.status(status).json(body);
    }

    // 2) Caso: viene desde tu ValidationPipe con { message: 'Errores de validación', errors: [...] }
    if (
      typeof body === 'object' &&
      (body as any).message === 'Errores de validación' &&
      Array.isArray((body as any).errors)
    ) {
      const validationErrors = (body as any).errors as Array<{
        field: string;
        errors: string[];
      }>;

      const formatted = validationErrors.map((e) => ({
        status,
        title: 'Errores de validación',
        detail: e.errors.join(', '),
        source: { pointer: e.field },
      }));

      return res.status(status).json({ errors: formatted });
    }

    // 3) Fallback genérico: armamos un errors[] con el message que venga
    let message: string | string[] = 'Error';

    if (typeof body === 'string') {
      message = body;
    } else if (typeof body === 'object' && (body as any).message) {
      message = (body as any).message;
    }

    const detail = Array.isArray(message) ? message.join(', ') : message;

    return res.status(status).json({
      errors: [
        {
          status,
          title: 'Error',
          detail,
        },
      ],
    });
  }
}
