import * as express from 'express';

function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`<LoggerMiddleware> ${request.method} ${request.path}`);
    next();
}

export default loggerMiddleware;