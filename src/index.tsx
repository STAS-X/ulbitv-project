import { ThemeProvider } from 'app/providers/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/error';
import App from 'app/App';
import 'app/styles/index.scss';

// import i18n (needs to be bundled ;))
import 'shared/config/i18n/i18n';
import { StoreProvider } from './app/providers/StoreProvider';
import RouterUtils from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';

const container = document.getElementById('project-root');

if (!container) {
	throw new Error('Контейнер не найден. Не удалось вмонтировать приложение!');
}

const root = createRoot(container);

root.render(
	<BrowserRouter>
		<RouterUtils>
			<StoreProvider>
				<ThemeProvider>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</ThemeProvider>
			</StoreProvider>
		</RouterUtils>
	</BrowserRouter>
);
