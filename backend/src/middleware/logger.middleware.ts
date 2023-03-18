import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import loggerService from 'src/services/loggerService';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.get('user-agent') || '';
    loggerService.info({
      userAgent: userAgent,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
    });
    next();
  }
}
