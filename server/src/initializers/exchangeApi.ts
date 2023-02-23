import axios from 'axios';
import { IApp } from '../interfaces/IApp';
import ExchangeApi from '../services/exchange';

export default function exchangeApiInit (app: IApp): void {
    const baseApi = axios.create({
        baseURL: process.env.EXCHANGE_API,
    })
    app.exchangeApi = new ExchangeApi(baseApi, process.env.SEED);
}
