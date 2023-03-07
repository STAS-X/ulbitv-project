import { FC, lazy, Suspense } from 'react';
import { LoginFormProps } from './LoginForm';

export { LoginForm as default } from './LoginForm';

export const LoginFormLoad = lazy(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./LoginFormLazy')), 1000);
		})
);

export const LoginFormLazy: FC<LoginFormProps> = (props) => {
	return (
		<Suspense fallback="">
			<LoginFormLoad {...props} />
		</Suspense>
	);
};
