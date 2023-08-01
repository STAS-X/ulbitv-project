import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { FC, memo, Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserId, getUserStatus, initAuthData } from '@/entities/User';
import { useAppDispatch } from './providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '../shared/lib/features/ToggleFeatures';
import { MainLayout } from '@/shared/layout';

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
				{className === 'app' && (
					<main>
						<Navbar />
						<Sidebar />
						<div className="content-page">{isInited && <AppRouter />}</div>
					</main>
				)}
				{className !== 'app' && (
					<MainLayout
						header={<Navbar />}
						content={<div className="content-page-redesign">{isInited && <AppRouter />}</div>}
						sidebar={<Sidebar />}
						toolbar={
							<aside>
								<span>test toolbar visual</span>
							</aside>
						}
					/>
				)}
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
		if (!userId) void initUser();
	}, [dispatch, userId]);

	//console.log(isRouterLoaded, 'isInited value is');

	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			off={<AppComponent isInited={isRouterLoaded} />}
			on={<AppComponent isInited={isRouterLoaded} className={'app_redesign'} />}
		/>
	);
};

export default App;
