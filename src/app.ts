import 'dotenv/config';
import * as http from 'http';
import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as cors from '@koa/cors';
import { IApp } from './interfaces/IApp';
import initRoutes from './initializers/routes';
import exchangeApiInit from './initializers/exchangeApi';
import errorHandler from './middleware/koaErrorHandler';

export default function (): IApp {
    const koa = new Koa();

    const app: IApp = {
        koa,
        router: new Router(),
        httpServer: http.createServer(koa.callback()),
    };

    for (const event of [ 'uncaughtException', 'unhandledRejection' ]) {
        process.on(event, (error) => {
            process.stderr.write(error);
            process.exit(1);
        })
    }

    /**
     * Initializers and middlewares
     */
    app.koa.use(cors({
        origin: 'http://localhost:4000',
        credentials: true,
    }));

    initRoutes(app);
    exchangeApiInit(app);
    errorHandler(app);

    app.koa
        .use(app.router.routes())
        .use(app.router.allowedMethods())
        // .use(cors({
        //     origin: 'localhost',
        //     credentials: true,
        // }));

    return app;
};
