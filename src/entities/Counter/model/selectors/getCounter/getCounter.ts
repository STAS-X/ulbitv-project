import { CounterSchema } from 'entities/Counter';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getCounter = (state: StateSchema) => state.counter;
export const getCounterValue = createSelector(getCounter, (counter: CounterSchema) => counter.value);
export const getCounterLazy = createSelector(getCounter, (counter: CounterSchema) => counter.isLazyModal);
