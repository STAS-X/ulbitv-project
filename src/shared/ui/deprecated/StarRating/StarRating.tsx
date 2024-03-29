import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star-24-24.svg';
import classes from './StarRating.module.scss';
import { Icon, IconTheme } from '../Icon/Icon';
import { HStack } from '../../redesign/Stack';

export interface StarRatingProps {
	className?: string;
	onSelect?: (rating: number) => Promise<any>;
	size?: number;
	count?: number;
	rating?: number;
	dataTestId?: string;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const StarRating: FC<StarRatingProps> = memo((props: StarRatingProps) => {
	const { className, size = 30, count = 5, rating = 0, dataTestId = 'Article.Rating.Stars', onSelect } = props;

	const [currentStar, setCurrentStar] = useState<number>(0);
	const [currentRating, setCurrentRating] = useState<number>(rating);

	const stars = Array.from({ length: count }, (_, i) => i);

	const handleInOutHover = useCallback(
		(starIndex: number) => {
			setCurrentStar(starIndex);
		},
		[setCurrentStar]
	);

	const handleSetRating = useCallback(
		async (starIndex: number) => {
			if (currentRating !== starIndex) {
				await Promise.all([
					setCurrentRating(starIndex),
					setCurrentStar(0),
					onSelect?.(starIndex),
					new Promise((resolve) => setTimeout(resolve, 300))
				]);
			} else {
				await Promise.all([
					setCurrentRating(0),
					setCurrentStar(0),
					await onSelect?.(0),
					new Promise((resolve) => setTimeout(resolve, 300))
				]);
			}
		},
		[setCurrentRating, currentRating, onSelect]
	);

	return (
		<div
			className={classNames(classes.StarRating, {}, [className])}
			style={{ width: `${size * 1.3 * count}px`, height: `${size * 1.3}px` }}
			onMouseLeave={() => handleInOutHover(0)}
		>
			<HStack max justify={'between'} align={'center'}>
				{stars.map((_, index) => {
					return (
						<Icon
							dataTestId={`${dataTestId}.${index + 1}`}
							key={index}
							theme={IconTheme.NONE}
							className={classNames(
								classes.starIcon,
								{
									[classes.isSelected]: Boolean(
										index + 1 <= currentStar || (index + 1 <= currentRating && currentStar === 0)
									),
									[classes.hasRating]: Boolean(
										index + 1 <= currentStar && currentStar === currentRating
									)
								},
								[]
							)}
							Svg={StarIcon}
							width={size}
							height={size}
							onMouseEnter={() => handleInOutHover(index + 1)}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={async () => await handleSetRating(index + 1)}
						/>
					);
				})}
			</HStack>
		</div>
	);
});
