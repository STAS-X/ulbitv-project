import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { FC, memo, useEffect, useState } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserId, getUserStatus, initAuthData } from '@/entities/User';
import { useAppDispatch } from './providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '../shared/lib/features/ToggleFeatures';
import { ApplicationFallBackLayout, MainLayout } from '@/shared/layout';
import { ScrollToTop } from '@/widgets/ScrollToTop';

interface AppComponentProps {
	className?: string;
	isInited: boolean;
}

const AppComponent: FC<AppComponentProps> = memo((props: AppComponentProps) => {
	const { className = 'app', isInited = false } = props;

	const { theme } = useTheme();
	const [inited, setInited] = useState(isInited);

	useEffect(() => setInited(isInited), [isInited]);

	return (
		<div className={classNames(className, {}, [theme])}>
			{!inited && (
				<ToggleFeatures feature={'isAppRedesigned'} on={<ApplicationFallBackLayout />} off={<PageLoader />} />
			)}
			{className === 'app' && inited && (
				<main>
					<Navbar />
					<Sidebar />
					<div className="content-page">{inited && <AppRouter />}</div>
				</main>
			)}
			{className !== 'app' && inited && (
				<MainLayout
					header={<Navbar />}
					content={<div className="content-page-redesign">{inited && <AppRouter />}</div>}
					sidebar={<Sidebar />}
					toolbar={<ScrollToTop />}
				/>
			)}
		</div>
	);
});

const App = () => {
	const userId = useSelector(getUserId);
	const isRouterLoaded = Boolean(useSelector(getUserStatus));

	const dispatch = useAppDispatch();

	useEffect(() => {
		const initUser = async () => await dispatch(initAuthData());
		if (!userId) setTimeout(() => void initUser(), 1000);
	}, [dispatch, userId]);

	//console.log(isRouterLoaded, 'isInited value is');

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<AppComponent isInited={isRouterLoaded} className={'app_redesign'} />}
			off={<AppComponent isInited={isRouterLoaded} className={'app'} />}
		/>
	);
};

export default App;
