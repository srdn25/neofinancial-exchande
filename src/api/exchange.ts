import * as Papaparse from 'papaparse';
import * as Application from 'koa';
import { IApp } from '../interfaces/IApp';
import { findAvailableCurrency } from '../tools';
import { ICurrency } from '../interfaces/IEntities';

export async function exchange(app: IApp, ctx: Application.Context, next: Application.Next) {
    const targetKey = String(ctx.query.targetKey);
    const sourceKey = ctx.query.sourceKey;


    const parentsList = [];
    const currenciesMap = new Map<string, ICurrency[]>();
    const results = [];

    const exchangeList = await app.exchangeApi.getCurrency();

    // go first cycle for prepare parent list and currencies Map
    exchangeList.forEach((currency) => {
        // find parents
        if (currency.fromCurrencyCode === sourceKey) {
            // go through all data from api
            // try to find when have next
            parentsList.push(currency);
        } else {
            const existsCurrency = currenciesMap.get(currency.fromCurrencyCode);
            currenciesMap.set(currency.fromCurrencyCode, existsCurrency ? [ ...existsCurrency, currency ] : [ currency ]);
        }
    })

    // cycle by parent list
    parentsList.forEach((parent) => {
        findAvailableCurrency(parent, currenciesMap, targetKey, results);
    });

    ctx.type = 'text/csv';
    ctx.response.attachment(`${sourceKey}-${targetKey}.csv`);
    ctx.body = Papaparse.unparse(results.sort((a, b) => a.rate < b.rate ? 1 : -1));
}