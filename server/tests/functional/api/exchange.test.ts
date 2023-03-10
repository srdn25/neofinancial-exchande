import { expect } from 'chai';
import * as nock from 'nock';
import * as supertest from 'supertest';
import * as fixtureResponse from '../../fixtures/exchangeApi.json';
import App from '../../../src/app';

describe('Exchange handler should return data', () => {
    const testSeed = process.env.SEED;
    const baseURL = process.env.EXCHANGE_API;
    const app = App();
    const testServerPort = 5133;

    before(() => {
        app.httpServer.listen(testServerPort);
        nock.disableNetConnect();
        nock.enableNetConnect('127.0.0.1');
    });

    after(() => {
        app.httpServer.close();
        nock.enableNetConnect();
    })

    it('Should return 503 error if exchange API returned empty response', async () => {
        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({seed: testSeed})
            .reply(200, []);

        await supertest(app.koa.callback())
            .get('/find-best-exchange?sourceKey=CAD&targetKey=PHP')
            .expect(503);

        scope.done();
    });

    it('Should return CSV response', async () => {
        const sourceKey = 'CAD';
        const targetKey = 'PHP';

        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({ seed: testSeed })
            .reply(200, fixtureResponse);

        const response = await supertest(app.koa.callback())
            .get(`/find-best-exchange?sourceKey=${sourceKey}&targetKey=${targetKey}`)
            .expect('Content-type', /csv/)
            .expect('Content-disposition', new RegExp(`attachment; filename="${sourceKey}-${targetKey}.csv"`))
            .expect(200);

        expect(response.text).to.be.eql('rate,code,countries,amount\r\n' +
            '40.654467586845776,"CAD, USD, CNY, HKD, PHP","Canada Dollar, USA Dollar, China Yuan/Renminbi, Hong Kong Dollar, Philippines Peso",4065.4467586845776\r\n' +
            '39.85282220069447,"CAD, HKD, PHP","Canada Dollar, Hong Kong Dollar, Philippines Peso",3985.282220069447\r\n' +
            '2.9274599668373753,"CAD, USD, HKD, PHP","Canada Dollar, USA Dollar, Hong Kong Dollar, Philippines Peso",292.74599668373753');
        scope.done();
    });

    it('Should return JSON response if query params exist out=json', async () => {
        const sourceKey = 'CAD';
        const targetKey = 'PHP';

        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({ seed: testSeed })
            .reply(200, fixtureResponse);


        const response = await supertest(app.koa.callback())
            .get(`/find-best-exchange?sourceKey=${sourceKey}&targetKey=${targetKey}&out=json`)
            .expect('Content-type', /json/)
            .expect(200);

        expect(response.text).to.be.eql('[{"rate":40.654467586845776,"code":"CAD, USD, CNY, HKD, PHP","countries":"Canada Dollar, USA Dollar, China Yuan/Renminbi, Hong Kong Dollar, Philippines Peso","amount":4065.4467586845776},{"rate":39.85282220069447,"code":"CAD, HKD, PHP","countries":"Canada Dollar, Hong Kong Dollar, Philippines Peso","amount":3985.282220069447},{"rate":2.9274599668373753,"code":"CAD, USD, HKD, PHP","countries":"Canada Dollar, USA Dollar, Hong Kong Dollar, Philippines Peso","amount":292.74599668373753}]');
        scope.done();
    });

    it('Should return directly exchange for example CAD->USD', async () => {
        const sourceKey = 'CAD';
        const targetKey = 'HKD';

        const scope = nock(baseURL)
            .get('/currency-conversion')
            .query({ seed: testSeed })
            .reply(200, fixtureResponse);


        const response = await supertest(app.koa.callback())
            .get(`/find-best-exchange?sourceKey=${sourceKey}&targetKey=${targetKey}&out=json`)
            .expect('Content-type', /json/)
            .expect(200);

        expect(response.text).to.be.eql('[{"rate":6.290353366963454,"code":"CAD, USD, CNY, HKD","countries":"Canada Dollar, USA Dollar, China Yuan/Renminbi, Hong Kong Dollar","amount":629.0353366963454},{"rate":6.166316992778611,"code":"CAD, HKD","countries":"Canada Dollar, Hong Kong Dollar","amount":616.631699277861},{"rate":0.4529577867354611,"code":"CAD, USD, HKD","countries":"Canada Dollar, USA Dollar, Hong Kong Dollar","amount":45.29577867354611}]');
        scope.done();
    });
});