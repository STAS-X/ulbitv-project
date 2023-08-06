import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

type ButtonTheme = 'clear' | 'inverted' | 'outline' | 'outline_red' | 'background' | 'backgroundInverted';

type ButtonSize = 'm'| 'l'| 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonTheme;
	square?: boolean;
	disabled?: boolean;
	size?: ButtonSize;
	children?: ReactNode;
	dataTestId?: string;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
	const {
		className,
		variant = 'outline',
		square = false,
		disabled = false,
		size = 'm',
		children,
		dataTestId = 'Button',
		...otherProps
	} = props;

	const mods: Mods = {
		[classes.square]: square,
		[classes.disabled]: disabled,
	};

	return (
		<button
			data-testid={`${dataTestId}.Button`}
			type="button"
			className={classNames(classes.button, mods, [classes[variant], classes[size], className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
