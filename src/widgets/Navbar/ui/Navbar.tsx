import { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';
import { LoginModal } from 'features/AuthByUserName/ui/LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { userActions, UserData } from 'entities/User';
import { getUserData } from 'entities/User/model/selectors/getUser/getUser';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation', 'articles']);

	const dispatch = useAppDispatch();

	const userdata = useSelector<StateSchema, UserData | undefined>(getUserData);

	const [isAuthModal, setIsAuthModal] = useState(false);

	const closeAuthModal = useCallback(() => {
		//console.log('closed modal');
		setIsAuthModal(false);
	}, []);

	const showAuthModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);
	const setLogOut = useCallback(() => {
		dispatch(userActions.logOut());
		//setTimeout(() => navigate(AppRoutes.ABOUT), 0);
	}, [dispatch]);

	return (
		<header className={classNames(classes.navbar, {}, [className])}>
			<Text className={classes.appName} theme={TextTheme.INVERTED} title={t('appName')} />
			<AppLink className={classes.createLink} to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
				{t('createArticle', { ns: 'articles' })}
			</AppLink>
			<Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
		</header>
	);
});
