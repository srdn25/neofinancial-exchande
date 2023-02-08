import {
    IBaseApi,
    IExchangeApi, IExchangeApiResponse,
} from '../interfaces/IExchangeApi';

export default class ExcangeApi implements IExchangeApi {
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
            throw Error('response has not data');
        }

        return response.data;
    }
}