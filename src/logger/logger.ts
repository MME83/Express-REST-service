import { createLogger, format, transports } from 'winston';
import { finished } from 'stream';
import { Request, Response, NextFunction } from 'express';

export const logger = createLogger({
    transports: [
        new transports.File({
            filename: `logs/info.log`,
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(
                    // eslint-disable-next-line dot-notation
                    (info) => `${info['timestamp']} ${info.level}: ${info.message}`
                )
            ),
        }),
        new transports.File({
            filename: `logs/error.log`,
            level: 'error',
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(
                    // eslint-disable-next-line dot-notation
                    (info) => `${info['timestamp']} ${info.level}: ${info.message}`
                )
            ),
        }),
    ],
});

export const logRequest = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { query, url, body, method } = req;
    finished(res, () => {
        const { statusCode } = res;
        logger.info({
            message: `
              method: ${method}, res.status: ${statusCode},
              url: ${url}
              query params: ${JSON.stringify(query)}
              body: ${JSON.stringify(body)}`,
        });
    });

    next();
};

export const logErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { query, url, body, method } = req;
    finished(res, () => {
        const { statusCode } = res;
        logger.error({
            message: `Error!
              res.status: ${statusCode}
              method: ${method}
              message: ${err.message}
              url: ${url}
              query params: ${JSON.stringify(query)}
              body: ${JSON.stringify(body)}`,
        });
    });

    next();
};

