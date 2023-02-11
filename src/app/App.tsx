import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';


const App = () => {
	
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<button style={{ display: 'block' }} onClick={() => toggleTheme()}>
				{theme === Theme.LIGHT ? 'Светлая' : 'Темная'} тема
			</button>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>
			<Suspense fallback={<div>Loading routes...</div>}>
				<Routes>
					<Route path={'/about'} element={<AboutPage />} />
					<Route index path={'*'} element={<MainPage />} />
				</Routes>
			</Suspense>
		</div>
	);
};
export default App;
