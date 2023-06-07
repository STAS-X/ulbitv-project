import { ThemeContext, Theme, ThemeContextProps } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import React, { FC, useMemo, useState, ReactNode } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '../lib/useTheme';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
	children?: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props: ThemeProviderProps) => {
	const { children } = props;

	const [theme, setTheme] = useState<Theme>(defaultTheme);

	const defaultProps = useMemo<ThemeContextProps>(() => ({ theme, setTheme }), [theme]);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
