import { StateSchema } from '@/app/providers/StoreProvider';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { buildSelector } from '@/shared/lib/store';

// Создаем селектор, возвращающий настройки пользователя
export const [useSettingsByUser, getSettingsByUser] = buildSelector(
	(state: StateSchema) => state.user?.authData?.jsonSettings || {}
);

// Создаем селектор, возвращающий настройки пользователя по ключу
export const [useSettingsByKey, getSettingsByKey] = buildSelector(
	(state: StateSchema, key: keyof JSONSettings) => {
		return state.user?.authData?.jsonSettings?.[key];
	}
);
