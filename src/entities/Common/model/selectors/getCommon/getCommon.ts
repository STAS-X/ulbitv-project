import { buildSelector } from '@/shared/lib/store';
import { CommonSchema } from '../../types/commonSchema';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommon = (state: StateSchema) => state.common;
export const getCommonValue = createSelector(getCommon, (common: CommonSchema) => common.value);
export const getCommonLazy = createSelector(getCommon, (common: CommonSchema) => common.isLazyModal);
export const [useCounterValue, getCounterValue] = buildSelector((state: StateSchema) => state.common.value);
