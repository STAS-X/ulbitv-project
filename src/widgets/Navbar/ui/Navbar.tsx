import { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { LoginModal } from 'features/AuthByUserName/ui/LoginModal/LoginModal';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/ui/Stack';
import { AddNotificationsButton } from 'features/AddNotifications';
import { AddMenuButton } from 'features/AddMenuButton/ui/AddMenuButton';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation', 'articles']);

	const [isAuthModal, setIsAuthModal] = useState(false);

	const closeAuthModal = useCallback(() => {
		//console.log('closed modal');
		setIsAuthModal(false);
	}, []);

	return (
		<header className={classNames(classes.navbar, {}, [className])}>
			<Text className={classes.appName} theme={TextTheme.INVERTED} title={t('appName')} />
			<AppLink className={classes.createLink} to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
				{t('createArticle', { ns: 'articles' })}
			</AppLink>
			<HStack gap={16} className={classes.actions}>
				<AddNotificationsButton className={classes.links} />
				<AddMenuButton className={classes.links} setIsAuth={setIsAuthModal} />
			</HStack>
			{/* <Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button> */}
			<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
		</header>
	);
});
