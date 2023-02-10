import * as Papaparse from 'papaparse';
import * as Application from 'koa';
import { IApp } from '../interfaces/IApp';
import { createKey, findAvailableCurrency } from '../tools';

export async function exchange(app: IApp, ctx: Application.Context, next: Application.Next) {
    const targetKey = String(ctx.query.targetKey);
    const sourceKey = ctx.query.sourceKey;

    const checkedSources = [];
    const results = [];
    const exchangeList = await app.exchangeApi.getCurrency();

    exchangeList.forEach((currency) => {
        const currencyKey = createKey(currency);

        // find parents
        if (currency.fromCurrencyCode === sourceKey && !checkedSources.includes(currencyKey)) {
            // go through all data from api
            // try to find when have next
            currency.next = findAvailableCurrency(currency, exchangeList, targetKey, results);

            // add to list for ignore it in future
            checkedSources.push(currencyKey);
        }
    })

    ctx.type = 'text/csv';
    ctx.response.attachment(`${sourceKey}-${targetKey}.csv`);
    ctx.body = Papaparse.unparse(results);
}