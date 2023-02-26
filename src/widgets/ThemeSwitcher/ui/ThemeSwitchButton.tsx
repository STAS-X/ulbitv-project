import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button } from 'shared/ui/Button/Button';

export interface ThemeSwitchButtonProps {
	className?: string;
}

export const ThemeSwitchButton: FC<ThemeSwitchButtonProps> = ({
	className,
}) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			className={classNames('', {}, [className])}
			onClick={toggleTheme}
		>
			{theme === Theme.LIGHT ? (
				<LightIcon transform="scale(0.75)" />
			) : (
				<DarkIcon transform="scale(0.75)" />
			)}
		</Button>
	);
};
