import { FC, memo, VFC, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export enum IconTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted'
}

export interface IconProps {
	className?: string;
	Svg: VFC<SVGProps<SVGSVGElement>>;
	theme?: IconTheme;
}

export const Icon: FC<IconProps> = memo((props: IconProps) => {
	const { className, Svg, theme = IconTheme.PRIMARY } = props;

	return <Svg className={classNames('', { [classes[theme]]: true }, [className])}></Svg>;
});
