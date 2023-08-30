import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export type IconVariant = 'standart' | 'none' | 'button' | 'alert' | 'navlink';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick' | 'ref'>;

interface IconBaseProps extends SvgProps {
	className?: string;
	Svg: FC<SVGProps<SVGSVGElement>>;
	variant?: IconVariant;
	dataTestId?: string;
}

interface IconNonClickable extends IconBaseProps {
	clickable?: false;
}

interface IconClickable extends IconBaseProps {
	clickable: true;
	onClick: () => void;
}

export type IconProps = IconClickable | IconNonClickable;

/**
 * Используем новые компоненты из папки redesigned
 */
export const Icon: FC<IconProps> = memo((props: IconProps) => {
	const {
		className = '',
		Svg,
		variant = 'standart',
		width = 32,
		height = 32,
		clickable,
		dataTestId = '',
		onMouseEnter,
		...others
	} = props;

	const SvgIcon = (
		<Svg
			data-testid={dataTestId}
			className={classNames(classes.icon, {}, [classes[variant], className])}
			width={width}
			height={height}
			{...others}
		/>
	);

	if (clickable)
		return (
			<button
				type={'button'}
				className={classNames(variant === 'button' ? classes.togglebutton : classes.nonebutton, {}, [
					className
				])}
				onMouseEnter={(e: any) => onMouseEnter?.(e)}
				onClick={props.onClick}
			>
				{SvgIcon}
			</button>
		);

	return SvgIcon;
});
