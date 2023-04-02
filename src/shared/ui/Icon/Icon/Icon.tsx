import { FC, memo, VFC, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export interface IconProps {
	className?: string;
	Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon: FC<IconProps> = memo((props: IconProps) => {
	const { className, Svg } = props;

	return <Svg className={classNames(classes.icon, {}, [className])}></Svg>;
});
