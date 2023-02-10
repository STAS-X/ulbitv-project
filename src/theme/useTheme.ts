import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';


interface UseThemeResult {
    toggleTheme: ()=>void;
    theme: Theme;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
		localStorage.setItem(
			LOCAL_STORAGE_THEME_KEY,
			theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		);
	};

	const resultTheme: UseThemeResult = { theme, toggleTheme };

	return resultTheme;
}