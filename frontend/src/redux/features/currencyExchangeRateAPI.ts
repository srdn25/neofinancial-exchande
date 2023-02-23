import axios from 'axios';

export interface IResponseGetFindExchangeRate {
    rate: number;
    code: string;
    countries: string;
    amount:number;
}

export interface IFetchRate {
    response: IResponseGetFindExchangeRate[];
    source: string;
    target: string;
}

const baseApi = axios.create({
    baseURL: 'http://localhost:3000',
})

export async function fetchRate(source: string, target: string): Promise<IFetchRate> {
    const response = await baseApi.get(`/find-best-exchange?sourceKey=${source}&targetKey=${target}&out=json`);

    return {
        source,
        target,
        response: response.data,
    }
}