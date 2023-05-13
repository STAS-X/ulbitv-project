import { FC, Suspense, useEffect, useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { PLACEHOLDER_AVATAR } from '../../const/localstorage';
import { ImageResource } from '../../lib/reactImageSource/imageSource';
import { Skeleton } from '../Skeleton/Skeleton';

export interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

const LazyLoadAvatar: FC<AvatarProps> = (props) => {
	const { src = PLACEHOLDER_AVATAR, size = 100, className = '', alt = '' } = props;

	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const clearId = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(clearId);
	}, []);

	return (
		<Suspense fallback={<Skeleton width={size} height={size} border={'50%'} />}>
			{loaded && <OriginAvatar src={src} size={size} alt={alt} className={classNames('', {}, [className])} />}
		</Suspense>
	);
};

const OriginAvatar: FC<AvatarProps> = (props: AvatarProps) => {
	const { src = PLACEHOLDER_AVATAR, size = 100, ...otherProps } = props;

	const srcOut = ImageResource.read(src) instanceof Event ? src : PLACEHOLDER_AVATAR;

	return <img src={srcOut} width={size} height={size} {...otherProps} />;
};

export { LazyLoadAvatar as Avatar };
