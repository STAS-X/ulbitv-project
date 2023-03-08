import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	INVERTED = 'inverted',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	disabled?: boolean;
	size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		className,
		theme = ButtonTheme.CLEAR,
		square,
		disabled = false,
		size = ButtonSize.M,
		children,
		...otherProps
	} = props;

	const mods: Record<string, boolean> = {
		[classes[theme]]: true,
		[classes.square]: square,
		[classes.disabled]: disabled,
		[classes[size]]: true
	};

	return (
		<button type="button" className={classNames(classes.button, mods, [className])} disabled={disabled} {...otherProps}>
			{children}
		</button>
	);
};
