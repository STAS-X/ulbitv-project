import { ThemeContext, Theme, ThemeContextProps } from './ThemeContext';
import React, { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from './useTheme';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

const ThemeProvider:FC = ({children}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo<ThemeContextProps>(
			() => ({ theme, setTheme }),
			[theme]
		);

    return (
			<ThemeContext.Provider value={defaultProps}>
				{children}
			</ThemeContext.Provider>
		);
};

export default ThemeProvider;