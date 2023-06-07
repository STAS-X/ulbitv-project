import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Navbar } from '@/widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserStatus, userActions } from '@/entities/User';
import { useAppDispatch } from './providers/StoreProvider';
import { useSelector } from 'react-redux';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const isRouterLoaded = Boolean(useSelector(getUserStatus));

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<div className="content-page">
					<Sidebar />
					{isRouterLoaded && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
};
export default App;
