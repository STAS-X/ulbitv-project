import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { FC, lazy, Suspense } from 'react';
import { AddArticleRatingProps } from './AddArticleRating';

const AddArticleRatingLazy: FC<AddArticleRatingProps> = lazy(
	() =>
		new Promise<{ default: FC<AddArticleRatingProps> }>(
			(resolve) => resolve(import('./AddArticleRating'))
			//setTimeout(() => resolve(import('./AboutPage')), 1000);
		)
);

export const AddArticleRatingSuspense = (props: AddArticleRatingProps) => {
	return (
		<Suspense fallback={<Skeleton width={'100%'} height={140} />}>
			<AddArticleRatingLazy {...props} />
		</Suspense>
	);
};
