import { AxiosResponse } from 'axios';
import {ICurrency} from './IEntities';
export interface IBaseApi {
    get (
        path: string,
        options: {
            params: object,
        }
    ): Promise<AxiosResponse<IExchangeApiResponse[]>>;
}
export interface IExchangeApi {
    getCurrency(): Promise<ICurrency[]>;
}

export interface IExchangeApiResponse {
    exchangeRate: number;
    fromCurrencyCode: string;
    fromCurrencyName: string;
    toCurrencyCode: string;
    toCurrencyName: string;
}