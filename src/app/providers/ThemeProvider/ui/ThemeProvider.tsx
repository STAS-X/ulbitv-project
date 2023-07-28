import { ThemeContext, ThemeContextProps } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import React, { FC, useMemo, useState, ReactNode, useEffect } from 'react';
//import { USER_LS_KEY } from '@/shared/const/localstorage';
import { getUserId, useSettingsByKey, getJSONSettingByKey } from '@/entities/User';
import { useAppDispatch } from '../../StoreProvider';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { useSelector } from 'react-redux';

// const defaultTheme =
// 	(JSON.parse(localStorage.getItem(USER_LS_KEY) ?? '{}')?.jsonSettings?.theme as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
	children?: ReactNode;
	toTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = (props: ThemeProviderProps) => {
	const { children, toTheme } = props;
	//const userTheme = useSettingsByKey('theme') as Theme;
	const userId = useSelector(getUserId);
	const defaultTheme = (useSettingsByKey('theme') as Theme) || Theme.LIGHT;

	const dispatch = useAppDispatch();

	const commonTheme = toTheme ?? defaultTheme;

	const [theme, setTheme] = useState<Theme>(commonTheme);

	useEffect(() => {
		const loadThemeFromBackend = async () => {
			await dispatch(getJSONSettingByKey('theme')).then((response) => {
				const { theme } = response.payload as Partial<JSONSettings>;
				//console.log(payload, 'get new theme');
				if (theme) setTheme(theme);
			});
		};
		if (!toTheme && userId) void loadThemeFromBackend();
	}, [dispatch, userId, toTheme]);

	const defaultProps = useMemo<ThemeContextProps>(() => ({ theme, setTheme }), [theme]);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
