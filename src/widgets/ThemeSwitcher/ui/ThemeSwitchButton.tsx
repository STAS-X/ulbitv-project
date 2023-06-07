import { useTheme } from '@/app/providers/ThemeProvider';
import { FC, memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Button } from '@/shared/ui/Button/Button';

export interface ThemeSwitchButtonProps {
	className?: string;
}

export const ThemeSwitchButton: FC<ThemeSwitchButtonProps> = memo((props: ThemeSwitchButtonProps) => {
	const { className = '' } = props;
	const { theme, toggleTheme } = useTheme();
	const [fillColor, setFillColor] = useState('');

	useEffect(() => {
		const bgColor = getComputedStyle(document.body).getPropertyValue('--theme-icon-flood-color');
		setFillColor(bgColor);
	}, [theme]);

	return (
		<Button className={classNames('', {}, [className])} onClick={toggleTheme}>
			<ThemeIcon fill={fillColor} transform="scale(0.75)" />
		</Button>
	);
});
