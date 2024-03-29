import { FC, Suspense, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { PLACEHOLDER_AVATAR } from '../../../const/localstorage';
import { ImageResource } from '../../../lib/reactImageSource/imageSource';
import { Skeleton } from '../Skeleton/Skeleton';

export interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	border?: string | number;
	alt?: string;
}

const LazyLoadAvatar: FC<AvatarProps> = (props: AvatarProps) => {
	const { src = PLACEHOLDER_AVATAR, size = 100, className = '', border = '50%', alt = '' } = props;
	// console.log(src, PLACEHOLDER_AVATAR, typeof PLACEHOLDER_AVATAR, 'get avatar src data');
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
					alt={alt}
					className={classNames('', {}, [className])}
				/>
			)}
		</Suspense>
	);
};

const OriginAvatar: FC<AvatarProps> = (props: AvatarProps) => {
	const { src = PLACEHOLDER_AVATAR, size = 100, border = '50%', ...otherProps } = props;

	const srcOut = src
		? _PROJECT_ !== 'jest' && ImageResource.read(src) instanceof Event
			? src
			: PLACEHOLDER_AVATAR
		: PLACEHOLDER_AVATAR;

	return <img src={srcOut} width={size} height={size}
style={{ borderRadius: border }} {...otherProps} />;
};

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export { LazyLoadAvatar as Avatar };
