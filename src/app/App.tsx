import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { FC, memo, Suspense, useEffect, useMemo } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserId, getUserStatus, initAuthData } from '@/entities/User';
import { useAppDispatch } from './providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '../shared/lib/features/ToggleFeatures';

interface AppComponentProps {
	className?: string;
	isInited: boolean;
}

const AppComponent: FC<AppComponentProps> = memo((props: AppComponentProps) => {
	const { className = 'app', isInited = false } = props;
	const { theme } = useTheme();

	return (
		<div className={classNames(className, {}, [theme])}>
			<Suspense fallback={<PageLoader />}>
				<Navbar />
				<div className="content-page">
					<Sidebar />
					{isInited && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
});

const App = () => {
	const userId = useSelector(getUserId);
	const isRouterLoaded = Boolean(useSelector(getUserStatus));

	const dispatch = useAppDispatch();

	useEffect(() => {
		const initUser = async () => await dispatch(initAuthData());
		if (userId && !isRouterLoaded) void initUser();
	}, [dispatch, userId, isRouterLoaded]);

	console.log(isRouterLoaded, 'isInited value is');

	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			off={<AppComponent isInited={isRouterLoaded} />}
			on={<AppComponent isInited={isRouterLoaded} className={'app_redesigned'} />}
		/>
	);
};

export default App;
