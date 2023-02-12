import { Link } from 'react-router-dom';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import {AppRouter} from './providers/router';
import './styles/index.scss';

const App = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<button style={{ display: 'block' }} onClick={() => toggleTheme()}>
				{theme === Theme.LIGHT ? 'Светлая' : 'Темная'} тема
			</button>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>
			<AppRouter />
		</div>
	);
};
export default App;
