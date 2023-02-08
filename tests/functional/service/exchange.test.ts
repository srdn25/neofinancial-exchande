import { stub } from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import * as nock from 'nock';
import ExchangeApi from '../../../src/services/exchange';
import * as fixtureResponse from '../../fixtures/exchangeApi.json';

describe('Exchange API should correct return data', () => {
    const testSeed = process.env.SEED;
    const baseURL = process.env.EXCHANGE_API;

    before(() => {
        nock.disableNetConnect();
        nock.enableNetConnect('127.0.0.1');
    });

    after(() => {
        nock.enableNetConnect();
    })

    it('Should return data from API', async () => {
        const baseApi = axios.create({ baseURL });

        const exchangeApi = new ExchangeApi(baseApi, testSeed);

        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({ seed: testSeed })
            .reply(200, fixtureResponse);

        const response = await exchangeApi.getCurrency();

        expect(response).to.be.an('array');
        expect(response).to.be.eql(fixtureResponse);
        scope.done();
    });

    it('Should throw error if request is empty', async () => {
        const baseApi = axios.create({ baseURL });
        const seed = '4786438282';

        const exchangeApi = new ExchangeApi(baseApi, seed);

        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({ seed })
            .reply(200, []);

        let error;
        try {
            await exchangeApi.getCurrency();
        } catch (err) {
            error = err;
        }

        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.be.eql('response has not data');

        scope.done();
    })
});