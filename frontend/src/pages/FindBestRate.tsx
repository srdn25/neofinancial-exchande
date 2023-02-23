import * as React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import './FindBestRate.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getExchange, selectCurrencyRate } from '../redux/features/currencyRateSlice';
import ExchangeTable from '../components/ExchangeTable';
import { IResponseGetFindExchangeRate } from '../redux/features/currencyExchangeRateAPI';

export default function FindBestRate() {
    const [sourceCurrency, setSourceCurrency] = React.useState('');
    const [targetCurrency, setTargetCurrency] = React.useState('');
    const [sourceError, setSourceError] = React.useState('Please enter currency');
    const [targetError, setTargetError] = React.useState('Please enter currency');

    const requests = useAppSelector(selectCurrencyRate);
    const dispatcher = useAppDispatch();

    const sendRequestGetExchange = () => {
        dispatcher(getExchange({ source: sourceCurrency, target: targetCurrency }));
    };

    const validate = (currency: string, update: React.SetStateAction<any>, updateError: React.SetStateAction<any>): void => {
        update(currency)
        if (!currency || typeof currency !== 'string' || !currency.length) {
            updateError('Please enter currency');
            return;
        }

        if (!/^[a-zA-Z]+$/.test(currency)) {
            updateError('Allowed only letters');
            return;
        }

        updateError('');
    };

    const isError = React.useMemo(() => (!!targetError || !!sourceError), [targetError, sourceError]);

    return (
        <div className="exchange-form">
            <Form error={isError}>
                <Form.Field
                    required
                    error={!!sourceError}
                >
                    <label>Source Currency</label>
                    <input
                        value={sourceCurrency}
                        onChange={e => validate(e.target.value, setSourceCurrency, setSourceError)}
                        placeholder='CAD'
                    />
                    {sourceError && (
                    <Message
                        error={!!sourceError}
                        header='Action Forbidden'
                        content={sourceError}
                    />)}
                </Form.Field>
                <Form.Field
                    required
                    error={!!targetError}
                >
                    <label>Target Currency</label>
                    <input
                        value={targetCurrency}
                        onChange={e => validate(e.target.value, setTargetCurrency, setTargetError)}
                        placeholder='PHP'
                    />
                    {targetError && (
                    <Message
                        error
                        header='Action Forbidden'
                        content={targetError}
                    />)}
                </Form.Field>
                <Button primary={!isError} disabled={isError} type='submit' onClick={sendRequestGetExchange}>Find</Button>
            </Form>

            {Object.entries(requests).map(([date, response]) => (
                <details>
                    <summary>{date}</summary>
                    <ExchangeTable data={response}></ExchangeTable>
                </details>
            ))}
        </div>
    );
}