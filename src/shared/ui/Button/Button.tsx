import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ThemeButton {
	CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		className,
		theme = ThemeButton.CLEAR,
		children,
		...otherProps
	} = props;

	return (
		<button
			className={classNames(classes.button, {}, [className, classes[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
