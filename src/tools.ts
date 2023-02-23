import { ICurrency, IGetExchangeResponseFormat } from './interfaces/IEntities';

export const createKey = (currency: ICurrency): string => `${currency.fromCurrencyCode}-${currency.toCurrencyCode}`;

export const getParents = (currency: ICurrency, acc: IGetExchangeResponseFormat = {}): IGetExchangeResponseFormat => {
    if (currency.prev) {
        acc.rate = acc.rate ? acc.rate * currency.exchangeRate : currency.exchangeRate;
        acc.code = acc.code ? `${currency.toCurrencyCode}, ${acc.code}`: currency.toCurrencyCode;
        acc.countries = acc.countries ? `${currency.toCurrencyName}, ${acc.countries}` : currency.toCurrencyName;
        return getParents(currency.prev, acc)
    }

    acc.rate = acc.rate ? acc.rate * currency.exchangeRate : currency.exchangeRate;
    acc.code = `${currency.fromCurrencyCode}, ${currency.toCurrencyCode}${acc.code ? `, ${acc.code}` : ''}`;
    acc.countries = `${currency.fromCurrencyName}, ${currency.toCurrencyName}${acc.countries ? `, ${acc.countries}` : ''}`;
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

    // handle case if we can exchange directly
    const targetFound = isTarget(parent, targetKey);
    if (typeof targetFound === 'object') {
        results.push(targetFound);
    }

    currencyList.map((curr) => {
        curr.prev = parent;
        const targetFound = isTarget(curr, targetKey);
        if (typeof targetFound === 'object') {
            if (results.length && results[0].rate < targetFound.rate) {
                results.unshift(targetFound);
            } else {
                results.push(targetFound);
            }
            return curr;
        }
        curr.next = findAvailableCurrency(curr, currencies, targetKey, results);
        return curr;
    });
};