import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { errorMappings } from './prisma-erorrs-mappings';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError,
    host: ArgumentsHost,
  ) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof PrismaClientKnownRequestError) {
      const errorCode = exception.code; // Obtiene el código de error para errores conocidos
      const errorMapping = errorMappings[errorCode];

      if (errorMapping) {
        const { status, message } = errorMapping;
        response.status(status).json({
          message: `${message} at path: ${
            request.url.split('/')[request.url.split('/').length - 1]
          }, Error Code: ${errorCode}`,
          statusCode: status,
        });
      } else {
        console.log('No Entro', errorCode);
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
        super.catch(exception, host); // Handle unknown error codes
      }
    }

    if (exception instanceof PrismaClientUnknownRequestError) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      const messageDetails = `at path: ${request.url.split('/')[request.url.split('/').length - 1]} :: ${exception.message.split('message')[1]}`

      response.status(status).json({
        message: `Unknown Prisma error ${messageDetails}`,
        statusCode: status,
      });
    }
  }
}
