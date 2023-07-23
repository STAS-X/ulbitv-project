import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../const/theme';

interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void;
	theme: Theme;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export function useTheme(): UseThemeResult {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);
	//const defaultTheme = (useSettingsByKey('theme') as Theme) || Theme.LIGHT;
	document.body.className = theme;

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
		}
		//localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		setTheme?.(newTheme);
		saveAction?.(newTheme);
	};

	const resultTheme: UseThemeResult = { theme: theme || Theme.LIGHT, toggleTheme };

	return resultTheme;
}
