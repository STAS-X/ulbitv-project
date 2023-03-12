import { FC, lazy, Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormProps } from './LoginForm';

export const LoginFormLoad: FC<LoginFormProps> = lazy<FC<LoginFormProps>>(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./LoginForm')), 1000);
		})
);

export const LoginFormLazy: FC<LoginFormProps> = (props) => {
	return (
		<Suspense fallback={<Loader />}>
			<LoginFormLoad {...props} />
		</Suspense>
	);
};
