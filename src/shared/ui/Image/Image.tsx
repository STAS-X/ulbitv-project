import { CSSProperties, FC, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Skeleton } from '../Skeleton/Skeleton';

export interface ImageProps {
	className?: string;
	src?: string;
	width?: string | number;
	height?: string | number;
	border?: string | number;
	alt?: string;
}

export const Image: FC<ImageProps> = (props) => {
	const { src = '', width = '100%', height = '100%', border = 0, alt = '', className = '' } = props;

	const [loaded, setLoaded] = useState<boolean>(false);

	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(() => {
		return { width, height, display: loaded ? 'block': 'none'  };
	}, [width, height, loaded]);

	const handleLoadImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		console.log(`The image with url of ${event.currentTarget.src} has been loaded`);
		setLoaded(true);
	};

	return (
		<>
			<img src={src} style={styles} onLoad={handleLoadImage} alt={alt} className={classNames('', mods, [className])} />
			{!loaded && <Skeleton width={width} height={height} border={border} />}
		</>
	);
};
