import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Rating.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingModal } from '../RatingModal/RatingModal';
import { detectMobileDevice } from '@/shared/lib/helpers/checkIsMobile';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import FeedBackForm from '../FeedBackForm/FeedBackForm';

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
			<VStack dataTestId={'Article.Rating.Frame'} align={'center'} gap={8}>
				<Text title={rating ? t('ratingTitle') : title} />
				{error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />}
				<StarRating rating={rating} size={40} onSelect={onSelectStarts} />
				{articleFeedBack && (
					<Text
						dataTestId={'Rating.FeedBack'}
						content={`${t('ratingPlaceholder')} ${articleFeedBack}`}
						size={TextSize.M}
					/>
				)}
			</VStack>
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
