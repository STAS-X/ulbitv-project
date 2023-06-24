import React, { createContext } from 'react';
import { Theme } from '@/shared/const/theme';

export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> = createContext<ThemeContextProps>({});
