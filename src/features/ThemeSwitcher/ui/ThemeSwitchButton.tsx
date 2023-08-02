import { useTheme } from '@/shared/lib/hooks/useTheme';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { saveJSONSettingsByUser } from '@/entities/User';
import classes from './ThemeSwitchButton.module.scss';

export interface ThemeSwitchButtonProps {
	className?: string;
}

export const ThemeSwitchButton: FC<ThemeSwitchButtonProps> = memo((props: ThemeSwitchButtonProps) => {
	const { className = '' } = props;
	const { theme, toggleTheme } = useTheme();
	//const [fillColor, setFillColor] = useState('');
	const dispatch = useAppDispatch();

	const onToggleTheme = useCallback(() => {
		toggleTheme((theme) => {
			const saveSettings = async () => {
				await dispatch(saveJSONSettingsByUser({ theme }));
			};
			void saveSettings();
			//console.log(theme, 'on toggle theme');
		});
	}, [dispatch, toggleTheme]);

	// useEffect(() => {
	// 	const rootThemeElement = document.body.getElementsByClassName(theme)?.[0];
	// 	if (rootThemeElement) {
	// 		const bgColor = getComputedStyle(rootThemeElement).getPropertyValue('--theme-icon-flood-color');
	// 		setFillColor(bgColor);
	// 	}
	// }, [theme]);

	return (
		<Button className={classNames('', {}, [className])} onClick={onToggleTheme}>
			<ThemeIcon className={classes.icon} />
		</Button>
	);
});
