import { expect } from 'chai';
import * as fixtureResponse from '../fixtures/exchangeApi.json';
import { createKey, getParents, isTarget } from '../../src/tools';

describe('Tools should work correct', () => {
    it('createKey should return key based on currency code', () => {
        const currency = fixtureResponse[0];
        const key = createKey(currency);

        expect(key).to.eql(`${currency.fromCurrencyCode}-${currency.toCurrencyCode}`);
    });

    it('isTarget should return false if currency not a target', () => {
        const currency = fixtureResponse[0];
        const result = isTarget(currency, 'unknownkey');

        expect(result).to.be.false;
    });

    it('getParents should find all parents and prepare response', () => {
        const currency = {
            "exchangeRate": 6.46298629268755,
            "fromCurrencyCode": "HKD",
            "fromCurrencyName": "Hong Kong Dollar",
            "toCurrencyCode": "PHP",
            "toCurrencyName": "Philippines Peso",
            prev: {
                "exchangeRate": 0.570865775014679,
                "fromCurrencyCode": "USD",
                "fromCurrencyName": "USA Dollar",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar",
                prev: {
                    "exchangeRate": 0.7934575981960276,
                    "fromCurrencyCode": "CAD",
                    "fromCurrencyName": "Canada Dollar",
                    "toCurrencyCode": "USD",
                    "toCurrencyName": "USA Dollar",
                }
            }
        };

        const result = getParents(currency);
        expect(result).to.eql({
            rate: 2.9274599668373753,
            code: "CAD, USD, HKD, PHP",
            countries: "Canada Dollar, USA Dollar, Hong Kong Dollar, Philippines Peso",
            amount: 292.74599668373753,
        });
    });
});