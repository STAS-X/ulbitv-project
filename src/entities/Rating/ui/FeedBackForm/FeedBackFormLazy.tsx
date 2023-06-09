import { FC, lazy, Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';
import { FeedBackFormProps } from './FeedBackForm';

export const FeedBackFormLoad: FC<FeedBackFormProps> = lazy<FC<FeedBackFormProps>>(() => import('./FeedBackForm'));

export const FeedBackFormLazy: FC<FeedBackFormProps> = (props) => {
	return (
		<Suspense fallback={<Loader />}>
			<FeedBackFormLoad {...props} />
		</Suspense>
	);
};
