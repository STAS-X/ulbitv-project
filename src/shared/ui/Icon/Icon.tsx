import { FC, memo, VFC, SVGProps, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export enum IconTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	ALERT = 'alert'
}

export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	Svg: FC<SVGProps<SVGSVGElement>>;
	theme?: IconTheme;
}

export const Icon: FC<Omit<IconProps, 'ref'>> = memo((props: IconProps) => {
	const { className, Svg, theme = IconTheme.PRIMARY, ...others } = props;

	return <Svg className={classNames(classes.icon, { [classes[theme]]: true }, [className])} {...others} />;
});
