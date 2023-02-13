import { ICurrency, IGetExchangeResponseFormat } from './interfaces/IEntities';

export const createKey = (currency: ICurrency): string => `${currency.fromCurrencyCode}-${currency.toCurrencyCode}`;

export const getParents = (currency: ICurrency, acc: IGetExchangeResponseFormat = {}): IGetExchangeResponseFormat => {
    if (currency.prev) {
        acc.rate = acc.rate ? acc.rate * currency.exchangeRate : currency.exchangeRate;
        acc.code = acc.code ? `${currency.toCurrencyCode}, ${acc.code}`: currency.toCurrencyCode;
        acc.countries = acc.countries ? `${currency.toCurrencyName}, ${acc.countries}` : currency.toCurrencyName;
        return getParents(currency.prev, acc)
    }

    acc.rate = acc.rate * currency.exchangeRate;
    acc.code = `${currency.fromCurrencyCode}, ${currency.toCurrencyCode}, ${acc.code}`;
    acc.countries = `${currency.fromCurrencyName}, ${currency.toCurrencyName}, ${acc.countries}`;
    acc.amount = 100 * acc.rate;
    return acc;
};

export const isTarget = (currency: ICurrency, targetKey: string): boolean | IGetExchangeResponseFormat => {
    if (currency.toCurrencyCode === targetKey) {
        return getParents(currency);
    }

    return false;
};

export const findAvailableCurrency = (parent: ICurrency, currencies, targetKey: string, results: IGetExchangeResponseFormat[]): void => {
    const currencyList = currencies.get(parent.toCurrencyCode) || [];

    currencyList.map((curr) => {
        curr.prev = parent;
        const targetFound = isTarget(curr, targetKey);
        if (typeof targetFound === 'object') {
            results.push(targetFound);
            return curr;
        }
        curr.next = findAvailableCurrency(curr, currencies, targetKey, results);
        return curr;
    });
};