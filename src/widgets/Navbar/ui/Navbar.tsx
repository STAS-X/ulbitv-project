import { useCallback, useState, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { LoginModal } from 'features/AuthByUserName/ui/LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { userActions, UserData, getUserData, getUserIsAdmin } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { DropDown } from 'shared/ui/DropDown/DropDown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation', 'articles']);

	const dispatch = useAppDispatch();	

	const userdata = useSelector<StateSchema, UserData | undefined>(getUserData);
	const isAdmin = useSelector<StateSchema, boolean>(getUserIsAdmin);

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

	const menuItems = useMemo(
		() =>
			[
				{ content: t('adminMenu'), href: `/${AppRoutes.ADMIN_PANEL}`, disabled: !Boolean(isAdmin) },
				{
					content: t('profileMenu'),
					href: `/${AppRoutes.PROFILE}/${userdata?.id ?? ''}`,
					disabled: !Boolean(userdata)
				},
				{ content: t(userdata ? 'logout' : 'login'), onClick: userdata ? setLogOut : showAuthModal }
			].filter(Boolean),
		[t, userdata, isAdmin, showAuthModal, setLogOut]
	);

	return (
		<header className={classNames(classes.navbar, {}, [className])}>
			<Text className={classes.appName} theme={TextTheme.INVERTED} title={t('appName')} />
			<AppLink className={classes.createLink} to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
				{t('createArticle', { ns: 'articles' })}
			</AppLink>
			<DropDown
				className={classes.links}
				items={menuItems}
				trigger={<Avatar size={30} border={'50%'} src={userdata?.avatar || ''} />}
			/>
			{/* <Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button> */}
			<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
		</header>
	);
});
