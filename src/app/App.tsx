import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { FC, memo, Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { SideBar } from '@/widgets/Sidebar';
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
					<>
						<Navbar />
						<div className="content-page">
							<SideBar />
							{isInited && <AppRouter />}
						</div>
					</>
				)}
				{className !== 'app' && (
					<MainLayout
						header={<Navbar />}
						content={<div className="content-page-redesign">{isInited && <AppRouter />}</div>}
						sidebar={<SideBar />}
						toolbar={
							<div>
								<span>test toolbar visual</span>
							</div>
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
			on={<AppComponent isInited={isRouterLoaded} className={'app_redesigned'} />}
		/>
	);
};

export default App;
