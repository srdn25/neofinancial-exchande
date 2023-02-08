import * as Application from 'koa';
import * as Router from '@koa/router';
import { Server } from 'http';
import {IExchangeApi} from './IExchangeApi';

export interface IApp {
    koa: Application<Application.DefaultState, Application.DefaultContext>,
    router: Router,
    httpServer: Server,
    exchangeApi?: IExchangeApi,
}