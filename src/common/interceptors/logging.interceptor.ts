import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const latency = Date.now() - startTime;
        const statusCode = response.statusCode;
        const contentLength = response.get('content-length');
        const ip = (request.headers['x-original-client-ip'] as string) || (request.headers['x-forwarded-for'] as string) || request.ip;

        // 요청이 /health가 아닌 경우만 처리
        if (!url.includes('health')) {
          this.logger.log(
            `${method} ${url} ${statusCode} ${contentLength} - ${userAgent}${Object.keys(body).length ? '\n' + JSON.stringify(body) : ''} - ${latency}ms ${ip}`,
          );
        }

      return data;
    }));
  }
}
