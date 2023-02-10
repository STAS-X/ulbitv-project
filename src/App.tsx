import React, { ReactElement, Suspense, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPageLazy from './pages/AboutPage/AboutPage.lazy';
import MainPageLazy from './pages/MainPage/MainPage.lazy';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { Theme, ThemeContext } from './theme/ThemeContext';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';



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
					<Route path={'/about'} element={<AboutPageLazy />} />
					<Route index path={'*'} element={<MainPageLazy />} />
				</Routes>
			</Suspense>
		</div>
	);
};
export default App;
