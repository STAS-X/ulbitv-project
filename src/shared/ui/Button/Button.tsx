import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	INVERTED = 'inverted',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outline_red',
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
	children?: ReactNode;
	dataTestId?: string;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
	const {
		className,
		theme = ButtonTheme.OUTLINE,
		square = false,
		disabled = false,
		size = ButtonSize.M,
		children,
		dataTestId = 'Button',
		...otherProps
	} = props;

	const mods: Mods = {
		[classes[theme]]: true,
		[classes.square]: square,
		[classes.disabled]: disabled,
		[classes[size]]: true
	};

	return (
		<button
			data-testid={`${dataTestId}`}
			type="button"
			className={classNames(classes.button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
