import { FC, lazy, Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';
import { LoginFormProps } from './LoginForm';

export const LoginFormLoad: FC<LoginFormProps> = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));

export const LoginFormLazy: FC<LoginFormProps> = (props) => {
	return (
		<Suspense fallback={<Loader />}>
			<LoginFormLoad {...props} />
		</Suspense>
	);
};
