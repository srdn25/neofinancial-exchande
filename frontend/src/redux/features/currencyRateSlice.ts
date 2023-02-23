import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { fetchRate, IFetchRate, IResponseGetFindExchangeRate } from './currencyExchangeRateAPI';

interface ICurrencyRateState {
    requests: {[p: string]: IResponseGetFindExchangeRate[]},
    status: 'idle' | 'loading' | 'failed',
}

const initialState: ICurrencyRateState = {
    requests: {},
    status: 'idle',
}

export const getExchange = createAsyncThunk<IFetchRate, { source: string, target: string }>(
    'counter/fetchRate',
    async ({ source, target }): Promise<IFetchRate> => {
        return fetchRate(source, target);
    }
);

export const currencyRateSlice = createSlice({
    name: 'currencyRate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExchange.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getExchange.fulfilled, (state: ICurrencyRateState, action) => {
                state.status = 'idle';
                const time = new Date();
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const seconds = time.getSeconds();

                const {response, target, source} = action.payload;

                state.requests = {
                    ...state.requests,
                    [`${hours}:${minutes}:${seconds} [${source} -> ${target}]`]: response,
                };
            })
            .addCase(getExchange.rejected, (state) => {
                state.status = 'failed';
            });
    },
})

export const selectCurrencyRate = (state: RootState) => state.currencyRate.requests;

export default currencyRateSlice.reducer;
