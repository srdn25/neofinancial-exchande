import * as Application from 'koa';
import { IApp } from '../interfaces/IApp';

export async function exchange(app: IApp, ctx: Application.Context, next: Application.Next) {
    const exchangeList = await app.exchangeApi.getCurrency();

    debugger
    ctx.body = {};
}