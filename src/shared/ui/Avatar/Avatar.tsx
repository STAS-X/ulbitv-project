import { CSSProperties, FC, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Skeleton } from '../Skeleton/Skeleton';
import classes from './Avatar.module.scss';

export interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
	const { src, size = 100, alt, className } = props;

	const [loaded, setLoaded] = useState<boolean>(false);

	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(() => {
		return { width: size, display: loaded ? 'block' : 'none' };
	}, [size, loaded]);

	const handleLoadImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		//console.log(`The image with url of ${event.currentTarget.src} has been loaded`);
		setLoaded(true);
	};

	return (
		<>
			<img
				src={_PROJECT_ === 'frontend' ? src : 'avatar.jpg'}
				style={styles}
				onLoad={handleLoadImage}
				alt={alt}
				className={classNames(classes.avatar, mods, [className])}
			/>
			{!loaded && <Skeleton width={size} height={size} border={'50%'} />}
		</>
	);
};
