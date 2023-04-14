import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import classes from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = memo<NotFoundPageProps>(({ className }) => {
	const { t } = useTranslation(['pages']);
	const { pathname: pageName } = useLocation();

	return (
		<PageWrapper className={classNames(classes.notfoundpage, {}, [className ?? ''])}>
			{t('Page not found', { pageName: pageName.replace('/', '') })}
		</PageWrapper>
	);
});
