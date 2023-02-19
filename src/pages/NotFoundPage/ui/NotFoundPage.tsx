import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
	const { t } = useTranslation(['pages']);
	const { pathname: pageName } = useLocation();

	return (
		<div className={classNames(classes.notfoundpage, {}, [className])}>
			{t('Page not found', { pageName: pageName.replace('/', '') })}
		</div>
	);
};
