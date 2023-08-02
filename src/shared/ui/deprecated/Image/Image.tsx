import { FC, Suspense, useEffect, useState, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PLACEHOLDER_IMAGE } from '../../../const/localstorage';
import { ImageResource } from '../../../lib/reactImageSource/imageSource';
import { Skeleton } from '../Skeleton/Skeleton';

export interface ImageProps {
	className?: string;
	children?: ReactNode;
	src?: string;
	width?: string | number;
	height?: string | number;
	border?: string | number;
	alt?: string;
}

const LazyLoadImage: FC<ImageProps> = (props: ImageProps) => {
	const { src = PLACEHOLDER_IMAGE, border = '10%', className = '', alt = '', ...otherProps } = props;

	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const clearId = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(clearId);
	}, []);

	return (
		<Suspense fallback={<Skeleton border={border} {...otherProps} />}>
			{loaded && <OriginImage src={src} alt={alt} className={classNames('', {}, [className])}
{...otherProps} />}
		</Suspense>
	);
};

const OriginImage: FC<ImageProps> = (props: ImageProps) => {
	const { src = PLACEHOLDER_IMAGE, border = '', ...otherProps } = props;

	const srcOut = src
		? _PROJECT_ !== 'jest' && ImageResource.read(src) instanceof Event
			? src
			: PLACEHOLDER_IMAGE
		: PLACEHOLDER_IMAGE;

	return <img src={srcOut} style={{ borderRadius: border }} {...otherProps} />;
};

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export { LazyLoadImage as Image };
