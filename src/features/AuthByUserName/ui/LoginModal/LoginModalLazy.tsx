import { FC, lazy, Suspense } from 'react';
import { LoginModalProps } from './LoginModal';

export { LoginModal as default } from './LoginModal';

export const LoginFormLazy = lazy(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./LoginModalLazy')), 1000);
		})
);

export const LoginModalLazy: FC<LoginModalProps> = (props) => {
	return (
		<Suspense fallback="">
			<LoginFormLazy {...props} />
		</Suspense>
	);
};
