import { AxiosResponse } from 'axios';
export interface IBaseApi {
    get (
        path: string,
        options: {
            params: object,
        }
    ): Promise<AxiosResponse<IExchangeApiResponse[]>>,
}
export interface IExchangeApi {
    getCurrency(): Promise<IExchangeApiResponse[]>
}

export interface IExchangeApiResponse {
    exchangeRate: number,
    fromCurrencyCode: string,
    fromCurrencyName: string,
    toCurrencyCode: string,
    toCurrencyName: string
}