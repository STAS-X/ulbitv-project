import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Sidebar } from 'widgets/Sidebar';
import { useAppDispatch } from './providers/StoreProvider/config/store';
import { userActions } from 'entities/User';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<div className="content-page">
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
};
export default App;
