import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import classes from './PageError.module.scss';

export interface PageErrorProps {
	className?: string;
	message?: string;
}

export const PageError: FC<PageErrorProps> = ({ className, message }) => {
	const { t } = useTranslation(['errors', 'pages']);
	const { theme } = useTheme();

	//console.log(message, theme);
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div className={classNames(classes.pageerror, {}, ['app', theme, className])}>
			<p>{t('errors:errorApp', { message })}</p>
			<Button onClick={handleReload}>
				{t('pages:reloadPage')}
			</Button>
		</div>
	);
};
