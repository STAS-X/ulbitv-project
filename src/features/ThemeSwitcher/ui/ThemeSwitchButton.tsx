import { useTheme } from '@/shared/lib/hooks/useTheme';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Button } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { saveJSONSettingsByUser } from '@/entities/User';

export interface ThemeSwitchButtonProps {
	className?: string;
}

export const ThemeSwitchButton: FC<ThemeSwitchButtonProps> = memo((props: ThemeSwitchButtonProps) => {
	const { className = '' } = props;
	const { theme, toggleTheme } = useTheme();
	const [fillColor, setFillColor] = useState('');
	const dispatch = useAppDispatch();

	const onToggleTheme = useCallback(() => {
		toggleTheme(async (theme) => {
			await dispatch(saveJSONSettingsByUser({ theme }));
			//console.log(theme, 'on toggle theme');
		});
	}, [dispatch, toggleTheme]);

	useEffect(() => {
		const rootThemeElement = document.body.getElementsByClassName(theme)?.[0];
		if (rootThemeElement) {
			const bgColor = getComputedStyle(rootThemeElement).getPropertyValue('--theme-icon-flood-color');
			setFillColor(bgColor);
		}
	}, [theme]);

	return (
		<Button className={classNames('', {}, [className])} onClick={onToggleTheme}>
			<ThemeIcon fill={fillColor} transform="scale(0.75)" />
		</Button>
	);
});
