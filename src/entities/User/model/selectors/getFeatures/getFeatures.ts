import { FeatureFlags } from '@/shared/lib/features/featureFlag';
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

// Создаем селектор, возвращающий фичи пользователя
export const [useFeaturesByUser, getFeaturesByUser] = buildSelector(
	(state: StateSchema) => state.user?.authData?.features || {}
);

// Создаем селектор, возвращающий фичи пользователя по ключу
export const [useFeaturesByKey, getFeaturesByKey] = buildSelector(
	(state: StateSchema, key: keyof FeatureFlags) => {
		return state.user?.authData?.features?.[key];
	}
);