import {
    IBaseApi,
    IExchangeApi,
    IExchangeApiResponse,
} from '../interfaces/IExchangeApi';
import HttpError from '../errors/httpError';

export default class ExchangeApi implements IExchangeApi {
    private baseApi: IBaseApi;
    private seed: string;
    constructor(baseApi: IBaseApi, seed: string) {
        this.baseApi = baseApi;
        this.seed = seed;
    }

    async getCurrency(): Promise<IExchangeApiResponse[]> {
        const response = await this.baseApi.get('currency-conversion', {
            params: {
                seed: this.seed,
            }
        })

        if (!response.data || !response.data.length) {
            throw new HttpError(503, 'Source server not working');
        }

        return response.data;
    }
}