import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AddArticleRating.module.scss';
import { Rating } from '@/entities/Rating';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User';
import {
	useAddArticleFeedBackMutation,
	useUpdateArticleFeedBackMutation,
	useGetArticleFeedBackQuery
} from '../api/articleFeedBackApi';
import { getErrorMessage } from '@/shared/types/thunk/thunkAction';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

export interface AddArticleRatingProps {
	className?: string;
	articleId: string;
}

const AddArticleRating: FC<AddArticleRatingProps> = memo((props: AddArticleRatingProps) => {
	const { className, articleId } = props;
	const { t } = useTranslation(['translation']);

	const authData = useSelector(getUserData);

	const [feedbackId, setFeedBackId] = useState<string>('');
	const [feedError, setFeedError] = useState<string>('');

	const {
		isLoading,
		isFetching,
		error: getError,
		isError: getIsError,
		isSuccess: getIsSuccess,
		data: feedbackData,
		refetch
	} = useGetArticleFeedBackQuery({ articleId, userId: authData?.id || '' });

	const [addArticleFeedBack, { error: putError, isError: putIsError }] = useAddArticleFeedBackMutation();

	const [updateArticleFeedBack, { error: postError, isError: postIsError }] = useUpdateArticleFeedBackMutation();

	useEffect(() => {
		if (getIsError) setFeedError(getErrorMessage(getError));
		if (putIsError) setFeedError(getErrorMessage(putError));
		if (postIsError) setFeedError(getErrorMessage(postError));
	}, [getIsError, getError, putIsError, putError, postIsError, postError]);

	useEffect(() => {
		if (getIsSuccess && feedbackData && feedbackData?.[0]?.id) {
			setFeedBackId(feedbackData[0].id);
		}
	}, [getIsSuccess, feedbackData]);

	const handleAcceptFeedBack = useCallback(
		async (rating: number, feedback: string) => {
			try {
				if (feedbackId) {
					await updateArticleFeedBack({
						id: feedbackId,
						articleId,
						userId: authData?.id || '',
						rating,
						feedback
					});
				} else await addArticleFeedBack({ articleId, userId: authData?.id || '', rating, feedback });
				await refetch();
				console.log(feedbackData?.[0], 'start refetch data');
			} catch (e) {}
		},
		[feedbackId, refetch, addArticleFeedBack, feedbackData, articleId, authData?.id, updateArticleFeedBack]
	);

	const handleCancelFeedBack = useCallback(
		async (rating: number) => {
			try {
				if (feedbackId) {
					await updateArticleFeedBack({
						id: feedbackId,
						articleId,
						userId: authData?.id || '',
						rating,
						feedback: ''
					});
				} else await addArticleFeedBack({ articleId, userId: authData?.id || '', rating, feedback: '' });
				await refetch();
				//console.log(feedbackData?.[0], 'start refetch data');
			} catch (e) {}
		},
		[feedbackId, refetch, addArticleFeedBack, articleId, authData?.id, updateArticleFeedBack]
	);

	useEffect(() => {
		console.log(feedbackData, 'REFETCHING');
	}, [feedbackData]);

	return (
		<div data-testid={'Article.Rating'} className={classNames(classes.AddArticleRating, {}, [className])}>
			{isLoading || isFetching ? (
				<Skeleton width={'100%'} height={140} />
			) : (
				<Rating
					title={t('ratingArticleTitle')}
					feedBackTitle={t('feedbackTitle')}
					hasFeedBack={true}
					articleRating={feedbackData?.[0]?.rating || 0}
					articleFeedBack={feedbackData?.[0]?.feedback || ''}
					error={feedError}
					max
					onCancel={handleCancelFeedBack}
					onAccept={handleAcceptFeedBack}
				/>
			)}
		</div>
	);
});

export default AddArticleRating;
