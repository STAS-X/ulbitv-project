import { FC, Suspense, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AVATAR_REDESIGN } from '../../../const/localstorage';
import { ImageResource } from '../../../lib/reactImageSource/imageSource';
import { Skeleton } from '../Skeleton/Skeleton';
import classes from './Avatar.module.scss';

type AvatarVariant = 'filter' | 'none';

export interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	variant?: AvatarVariant;
	border?: string | number;
	alt?: string;
}

const LazyLoadAvatar: FC<AvatarProps> = (props: AvatarProps) => {
	const { src = AVATAR_REDESIGN, size = 100, className = '', variant = 'none', border = '50%', alt = '' } = props;
	//console.log(src, AVATAR_REDESIGN, typeof AVATAR_REDESIGN, 'get avatar src data');
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const clearId = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(clearId);
	}, []);

	return (
		<Suspense fallback={<Skeleton width={size} height={size} border={border} />}>
			{loaded && (
				<OriginAvatar
					src={src}
					size={size}
					border={border}
					variant={variant}
					alt={alt}
					className={classNames('', {}, [className])}
				/>
			)}
		</Suspense>
	);
};

const OriginAvatar: FC<AvatarProps> = (props: AvatarProps) => {
	const { src = AVATAR_REDESIGN, size = 100, variant = 'none', border = '50%', ...otherProps } = props;

	const srcOut = src
		? _PROJECT_ !== 'jest' && ImageResource.read(src) instanceof Event
			? src
			: AVATAR_REDESIGN
		: AVATAR_REDESIGN;

	return (
		<img
			src={srcOut}
			width={size}
			height={size}
			style={{ borderRadius: border }}
			{...otherProps}
			className={classes[variant]}
		/>
	);
};

/**
 * Используем новые компоненты из папки redesigned
 */
export { LazyLoadAvatar as Avatar };
