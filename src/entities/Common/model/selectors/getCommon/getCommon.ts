import { CommonSchema } from '../../../';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getCommon = (state: StateSchema) => state.common;
export const getCommonValue = createSelector(getCommon, (common: CommonSchema) => common.value);
export const getCommonLazy = createSelector(getCommon, (common: CommonSchema) => common.isLazyModal);
