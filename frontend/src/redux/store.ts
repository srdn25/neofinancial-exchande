import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import currencyRateReducer from './features/currencyRateSlice';

export const store = configureStore({
    reducer: {
        currencyRate: currencyRateReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;