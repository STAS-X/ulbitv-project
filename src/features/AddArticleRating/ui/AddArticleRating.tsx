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

export interface AddArticleRatingProps {
	className?: string;
	articleId: string;
}

const AddArticleRating: FC<AddArticleRatingProps> = memo((props: AddArticleRatingProps) => {
	const { className, articleId } = props;
	const { t } = useTranslation(['translation']);

	const authData = useSelector(getUserData);

	const [feedbackId, setFeddBackId] = useState<string>('');
	const [feedError, setFeedError] = useState<string>('');

	const {
		isLoading: getIsLoading,
		error: getError,
		isError: getIsError,
		isSuccess: getIsSuccess,
		data: feedbackData,
		refetch
	} = useGetArticleFeedBackQuery({ articleId, userId: authData?.id || '' });

	const [addArticleFeedBack, { error: putError, isError: putIsError }] = useAddArticleFeedBackMutation();

	const [updateArticleFeedBack, { error: postError, isError: postIsError }] = useUpdateArticleFeedBackMutation();

	useEffect(() => {
		if (getIsError && getErrorMessage(getError)) setFeedError(getErrorMessage(getError));
		if (putIsError && getErrorMessage(putError)) setFeedError(getErrorMessage(putError));
		if (postIsError && getErrorMessage(postError)) setFeedError(getErrorMessage(postError));
	}, [getIsError, getError, putIsError, putError, postIsError, postError]);

	useEffect(() => {
		if (getIsSuccess && feedbackData && feedbackData?.[0]?.id) setFeddBackId(feedbackData[0].id);
	}, [getIsSuccess, feedbackData]);

	const handleAcceptFeedBack = useCallback(
		async (rating: number, feedback: string) => {
			try {
				if (feedbackId) {
					await updateArticleFeedBack({ id: feedbackId, articleId, userId: authData?.id || '', rating, feedback });
				} else await addArticleFeedBack({ articleId, userId: authData?.id || '', rating, feedback });
				await refetch();
			} catch (e) {}
		},
		[feedbackId, refetch, addArticleFeedBack, articleId, authData?.id, updateArticleFeedBack]
	);

	const handleCancelFeedBack = useCallback(
		async (rating: number) => {
			try {
				if (feedbackId) {
					await updateArticleFeedBack({ id: feedbackId, articleId, userId: authData?.id || '', rating, feedback: '' });
				} else await addArticleFeedBack({ articleId, userId: authData?.id || '', rating, feedback: '' });
				await refetch();
			} catch (e) {}
		},
		[feedbackId, refetch, addArticleFeedBack, articleId, authData?.id, updateArticleFeedBack]
	);

	return (
		<div className={classNames(classes.AddArticleRating, {}, [className])}>
			<Rating
				title={t('ratingArticleTitle')}
				feedBackTitle={t('feedbackTitle')}
				hasFeedBack={true}
				articleRating={feedbackData?.[0]?.rating || 0}
				articleFeedBack={feedbackData?.[0]?.feedback || ''}
				error={feedError}
				isLoading={getIsLoading}
				max
				onCancel={handleCancelFeedBack}
				onAccept={handleAcceptFeedBack}
			/>
		</div>
	);
});

export default AddArticleRating;
