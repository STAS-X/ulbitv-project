import { useLocation } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { getUserData } from 'entities/User';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
	className?: string;
}

interface StateToLocation {
	from?: string;
}

export const ForbiddenPage: FC<ForbiddenPageProps> = memo((props: ForbiddenPageProps) => {
	const { className } = props;

	const { t } = useTranslation(['pages']);
	const userData = useSelector(getUserData);
	const { pathname, state } = useLocation();

	let pageName = '';
	if (state) {
		pageName = (state as StateToLocation).from || '';
	} else pageName = pathname;

	return (
		<PageWrapper className={classNames(classes.Forbiddenpage, {}, [className ?? ''])}>
			{t('access_forbidden', { userName: userData?.username, pageName })}
		</PageWrapper>
	);
});
