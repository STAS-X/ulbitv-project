import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Rating.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
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
	onCancel: () => void;
	title: string;
}

export const Rating: FC<RatingProps> = memo((props: RatingProps) => {
	const { className, onAccept, feedBackTitle, hasFeedBack, onCancel, title } = props;

	const [rating, setRating] = useState(0);
	const [feedBack, setFeedBack] = useState('');
	const { t } = useTranslation();

	const isMobile = detectMobileDevice();

	const { isOpen, closeHandler: onModalHandler } = useModal({
		isOpen: false,
		animationDelay: isMobile ? 350 : 300
	});

	const handleSuccess = useCallback(() => {
		onModalHandler();
		onAccept(rating, feedBack);
	}, [onModalHandler, onAccept, rating, feedBack]);

	const onCloseModal = useCallback(() => {
		onModalHandler();
		onCancel();
	}, [onModalHandler, onCancel]);

	const onSelectStarts = (stars: number) => {
		setRating(stars);
		if (stars > 0) onModalHandler();
	};
	const onFeedBack = (feedback: string) => {
		setFeedBack(feedback);
	};

	return (
		<Card className={classNames(classes.Rating, {}, [className])}>
			<VStack align={'center'} gap={8}>
				<Text title={title} />
				<StarRating size={40} onSelect={onSelectStarts} />
			</VStack>
			{hasFeedBack &&
				(isMobile ? (
					<Drawer onClose={onModalHandler} isOpen={isOpen} maxHeight={'50%'}>
						<FeedBackForm
							title={feedBackTitle}
							onClose={onCloseModal}
							onFeedBack={onFeedBack}
							onSuccess={handleSuccess}
						/>
					</Drawer>
				) : (
					<RatingModal
						isOpen={isOpen}
						title={feedBackTitle}
						onFeedBack={onFeedBack}
						onClose={onCloseModal}
						onSuccess={handleSuccess}
					/>
				))}
		</Card>
	);
});
