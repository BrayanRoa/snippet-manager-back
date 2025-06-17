// src/common/interceptors/response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // ✅ Correcto
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_MESSAGE_KEY } from '../decorators/api-message.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler();

        const message = this.reflector.get<string>(API_MESSAGE_KEY, handler);

        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: message || 'success operation',
                data,
            })),
            catchError((err) => {
                const statusCode = err.status || 500;

                return throwError(() =>
                    new HttpException(
                        {
                            success: false,
                            message: err.message || 'server error',
                            error: {
                                statusCode,
                                details: err.response?.message || err.message || err,
                            },
                        },
                        statusCode,
                    ),
                );
            }),
        );
    }
}
