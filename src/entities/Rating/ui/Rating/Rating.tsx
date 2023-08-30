import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Rating.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card as CardRedesign } from '@/shared/ui/redesign/Card/Card';
import { VStack } from '@/shared/ui/redesign/Stack';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesign/Text/Text';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating/StarRating';
import { StarRating } from '@/shared/ui/redesign/StarRating/StarRating';
import { RatingModal } from '../RatingModal/RatingModal';
import { detectMobileDevice } from '@/shared/lib/helpers/checkIsMobile';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Drawer as DrawerDeprecated } from '@/shared/ui/deprecated/Drawer/Drawer';
import { Drawer as DrawerRedesign } from '@/shared/ui/redesign/Drawer/Drawer';
import FeedBackForm from '../FeedBackForm/FeedBackForm';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface RatingProps {
	className?: string;
	onAccept: (stars: number, feedback: string) => void;
	feedBackTitle: string;
	hasFeedBack: boolean;
	articleRating?: number;
	articleFeedBack?: string;
	error: string;
	max?: boolean;
	onCancel: (stars: number) => void;
	title: string;
}

export const Rating: FC<RatingProps> = memo((props: RatingProps) => {
	const {
		className,
		onAccept,
		feedBackTitle,
		hasFeedBack,
		error = '',
		articleRating = 0,
		articleFeedBack = '',
		max = false,
		onCancel,
		title
	} = props;

	const [rating, setRating] = useState(articleRating);
	//const [feedBack, setFeedBack] = useState(articleFeedBack);
	const { t } = useTranslation();

	const isMobile = detectMobileDevice();

	const { isOpen, closeHandler: onModalHandler } = useModal({
		isOpen: false,
		animationDelay: isMobile ? 350 : 300
	});

	// @ts-ignore
	const Card = toggleFeatures({ feature: 'isAppRedesigned', on: CardRedesign, off: CardDeprecated });
	// @ts-ignore
	const Drawer = toggleFeatures({ feature: 'isAppRedesigned', on: DrawerRedesign, off: DrawerDeprecated });

	const handleSuccess = useCallback(
		(feedback: string) => {
			onModalHandler();
			onAccept(rating, feedback);
		},
		[onModalHandler, onAccept, rating]
	);

	const onCloseModal = useCallback(() => {
		onModalHandler();
		onCancel(rating);
	}, [onModalHandler, rating, onCancel]);

	const onSelectStarts = (stars: number) => {
		setRating(stars);
		if (stars > 0) {
			onModalHandler();
		} else onAccept(0, '');
	};
	// const onFeedBack = (feedback: string) => {
	// 	setFeedBack(feedback);
	// };

	return (
		<Card className={classNames(classes.Rating, { [classes.max]: max }, [className])}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<VStack dataTestId={'Article.Rating.Frame'} align={'center'} gap={8} max>
						<Text title={rating ? t('ratingTitle') : title} />
						{error && <Text content={t('errorApp', { ns: 'errors', message: error })} variant={'error'} />}
						<StarRating rating={rating} size={40} onSelect={onSelectStarts} />
						{articleFeedBack && (
							<Text
								dataTestId={'Rating.FeedBack'}
								content={`${t('ratingPlaceholder')} ${articleFeedBack}`}
								size={'m'}
							/>
						)}
					</VStack>
				}
				off={
					<VStack dataTestId={'Article.Rating.Frame'} align={'center'} gap={8} max>
						<TextDeprecated title={rating ? t('ratingTitle') : title} />
						{error && (
							<TextDeprecated
								content={t('errorApp', { ns: 'errors', message: error })}
								theme={TextTheme.ERROR}
							/>
						)}
						<StarRatingDeprecated rating={rating} size={40} onSelect={onSelectStarts} />
						{articleFeedBack && (
							<TextDeprecated
								dataTestId={'Rating.FeedBack'}
								content={`${t('ratingPlaceholder')} ${articleFeedBack}`}
								size={TextSize.M}
							/>
						)}
					</VStack>
				}
			/>
			{hasFeedBack &&
				(isMobile ? (
					<Drawer onClose={onModalHandler} isOpen={isOpen} maxHeight={'50%'}>
						<FeedBackForm title={feedBackTitle} onClose={onCloseModal} onSuccess={handleSuccess} />
					</Drawer>
				) : (
					<RatingModal
						isOpen={isOpen}
						title={feedBackTitle}
						onClose={onCloseModal}
						onSuccess={handleSuccess}
					/>
				))}
		</Card>
	);
});
