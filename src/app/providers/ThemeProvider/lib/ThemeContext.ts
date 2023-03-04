import React, { createContext } from 'react';

export enum Theme {
	LIGHT = 'light_theme',
	DARK = 'dark_theme'
}

export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> = createContext<ThemeContextProps>({});
