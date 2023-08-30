import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star-24-24.svg';
import classes from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import { HStack } from '../../redesign/Stack';

export interface StarRatingProps {
	className?: string;
	onSelect?: (rating: number) => void;
	size?: number;
	count?: number;
	rating?: number;
	dataTestId?: string;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const StarRating: FC<StarRatingProps> = memo((props: StarRatingProps) => {
	const { className, size = 30, count = 5, rating = 0, dataTestId = 'Article.Rating.Stars', onSelect } = props;

	const [currentStar, setCurrentStar] = useState<number>(0);
	const [currentRating, setCurrentRating] = useState<number>(rating);

	const stars = Array.from({ length: count }, (_, i) => i);

	const isSelected = useCallback(
		(starIndex: number) => Boolean(starIndex <= currentStar || (starIndex <= currentRating && currentStar === 0)),
		[currentStar, currentRating]
	);

	const hasRating = useCallback(
		(starIndex: number) => {
			console.log(starIndex, 'has rating', starIndex <= currentRating, currentStar, currentRating);
			return Boolean(starIndex <= currentRating && currentStar === currentRating);
		},
		[currentStar, currentRating]
	);

	const handleInOutHover = useCallback(
		(starIndex: number) => {
			console.log('test leave mouse');
			setCurrentStar(starIndex);
		},
		[setCurrentStar]
	);

	const handleSetRating = useCallback(
		(starIndex: number) => {
			if (currentRating !== starIndex) {
				setTimeout(() => {
					setCurrentRating(starIndex);
					setCurrentStar(0);
					onSelect?.(starIndex);
				}, 300);
			} else {
				setTimeout(() => {
					setCurrentRating(0);
					setCurrentStar(0);
					onSelect?.(0);
				}, 300);
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
							variant={'none'}
							className={classNames(
								classes.starIcon,
								{
									[classes.isSelected]: isSelected(index + 1),
									[classes.hasRating]: hasRating(index + 1)
								},
								[]
							)}
							Svg={StarIcon}
							width={size}
							height={size}
							onMouseEnter={() => handleInOutHover(index + 1)}
							clickable
							onClick={() => handleSetRating(index + 1)}
						/>
					);
				})}
			</HStack>
		</div>
	);
});
