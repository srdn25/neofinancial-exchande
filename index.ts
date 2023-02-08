import 'dotenv/config';
import * as http from 'http';
import * as Koa from 'koa';
import * as Router from '@koa/router';
import { IApp } from './src/interfaces/IApp';
import initRoutes from './src/initializers/routes';
import exchangeApiInit from './src/initializers/exchangeApi';

(async () => {
    const koa = new Koa();

    const app: IApp = {
        koa,
        router: new Router(),
        httpServer: http.createServer(koa.callback()),
    };

    for (const event of [ 'uncaughtException', 'unhandledRejection' ]) {
        process.on(event, error => {
            process.stderr.write(error);
            process.exit(1);
        })
    }

    /**
     * Initializers
     */
    initRoutes(app);
    exchangeApiInit(app);

    app.koa
        .use(app.router.routes())
        .use(app.router.allowedMethods())

    app.httpServer.listen(3000);
    console.log('Application started on 3000 port');

    app.httpServer.on('close', () => {
        console.log('Application has been stopped');
    })
})();
