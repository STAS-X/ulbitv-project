import { CSSProperties, FC, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Avatar.module.scss';

export interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
	const { src, size = 100, alt, className } = props;
	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(() => {
		return { width: size };
	}, [size]);

	return (
		<img
			src={_PROJECT_ === 'frontend' ? src : 'avatar.jpg'}
			style={styles}
			alt={alt}
			className={classNames(classes.avatar, mods, [className])}
		/>
	);
};
