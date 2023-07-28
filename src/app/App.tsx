import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserStatus, initAuthData } from '@/entities/User';
import { useAppDispatch } from './providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { PageLoader } from '@/widgets/PageLoader';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const isRouterLoaded = Boolean(useSelector(getUserStatus));

	useEffect(() => {
		const initUser = async () => await dispatch(initAuthData());
		void initUser();
	}, [dispatch]);


	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback={<PageLoader />}>
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
