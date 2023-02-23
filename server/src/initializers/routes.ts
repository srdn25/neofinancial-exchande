import * as Application from 'koa';
import { IApp } from '../interfaces/IApp';
import { exchange } from '../api/exchange';

export default function initRoutes(app: IApp) {
    app.router.get(
        '/find-best-exchange',
        (ctx: Application.Context, next: Application.Next) =>
            exchange(app, ctx, next)
    )
};