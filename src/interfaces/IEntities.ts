import { IExchangeApiResponse } from './IExchangeApi';

export interface ICurrency extends IExchangeApiResponse {
    next?: ICurrency[];
    prev?: ICurrency;
}

export interface IGetExchangeResponseFormat {
    rate?: number;
    code?: string;
    countries?: string;
    amount?: number;
}