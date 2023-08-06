import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export enum IconTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	NONE = '',
	ALERT = 'alert'
}

export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	Svg: FC<SVGProps<SVGSVGElement>>;
	theme?: IconTheme;
	dataTestId?: string;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const Icon: FC<Omit<IconProps, 'ref'>> = memo((props: IconProps) => {
	const { className, Svg, theme = IconTheme.INVERTED, dataTestId = '', ...others } = props;

	return (
		<Svg
			data-testid={dataTestId}
			className={classNames(classes.icon, { [classes[theme]]: true }, [className])}
			{...others}
		/>
	);
});
