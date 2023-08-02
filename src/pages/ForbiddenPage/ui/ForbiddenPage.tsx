import { useLocation } from '@/shared/lib/hooks/useRouterUtils';
import { getUserData } from '@/entities/User';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Location } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
	className?: string;
}

interface StateToLocation {
	from?: Location;
}

export const ForbiddenPage: FC<ForbiddenPageProps> = memo((props: ForbiddenPageProps) => {
	const { className } = props;

	const { t } = useTranslation(['pages']);
	const userData = useSelector(getUserData);
	const { pathname, state } = useLocation();

	const pageName = (state as StateToLocation)?.from?.pathname ?? pathname;

	return (
		<PageWrapper data-testid={'ForbiddenPage'} className={classNames(classes.Forbiddenpage, {}, [className ?? ''])}>
			{t('access_forbidden', { userName: userData?.username, pageName })}
		</PageWrapper>
	);
});
