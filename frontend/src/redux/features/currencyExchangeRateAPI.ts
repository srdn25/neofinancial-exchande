import axios from 'axios';

export interface IResponseGetFindExchangeRate {
    rate: number;
    code: string;
    countries: string;
    amount:number;
}

const baseApi = axios.create({
    baseURL: 'http://localhost:3000',
})

export function fetchRate(source: string, target: string): Promise<{ data: IResponseGetFindExchangeRate[] }> {
    return baseApi.get(`/find-best-exchange?sourceKey=${source}&targetKey=${target}&out=json`)
}