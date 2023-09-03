// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { useSettingsByKey } from '@/entities/User';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '../../const/localstorage';

interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void;
	theme: Theme;
}

export const useGetDefaultTheme = (): Theme => {
	const themeValue = useSettingsByKey('theme') as Theme;
	if (themeValue) return themeValue;

	const themeFlag = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? '';
	//console.log(themeFlag, typeof themeFlag, JSON.stringify(Theme).indexOf(themeFlag+'112212'), 'theme flag type');
	if (themeFlag && JSON.stringify(Theme).indexOf(themeFlag) > -1) {
		//console.log(JSON.parse(featureFlags)[flag], 'get flags data');
		console.log(themeFlag, 'get themeFlag');
		return themeFlag as Theme;
	}
	return Theme.LIGHT;
};

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);
	//document.body.className = theme;

	const toggleTheme = (saveAction: (theme: Theme) => void) => {
		let newTheme: Theme;
		switch (theme) {
			case Theme.LIGHT:
				newTheme = Theme.DARK;
				break;
			case Theme.DARK:
				newTheme = Theme.ORANGE;
				break;
			case Theme.ORANGE:
				newTheme = Theme.LIGHT;
				break;
			default:
				newTheme = Theme.LIGHT;
				break;
		}

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		setTheme?.(newTheme);
		saveAction?.(newTheme);
	};

	const resultTheme: UseThemeResult = { theme: theme || Theme.LIGHT, toggleTheme };

	return resultTheme;
}
