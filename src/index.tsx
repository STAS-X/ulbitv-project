import { ThemeProvider } from 'app/providers/ThemeProvider';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/error';
import App from 'app/App';
import 'app/styles/index.scss';

// import i18n (needs to be bundled ;))
import 'shared/config/i18n/i18n';

render(
	<BrowserRouter>
		<ThemeProvider>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
