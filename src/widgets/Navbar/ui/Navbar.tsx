import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { LoginModal } from '@/features/AuthByUserName';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';
import { HStack } from '@/shared/ui/redesign/Stack';
import { AddNotificationsButton } from '@/features/AddNotifications';
import { AddMenuButton } from '@/features/AddMenuButton';
import { useModal } from '@/shared/lib/hooks/useModal';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface NavbarProps {
	className?: string;
}

export const NavbarComponent = memo((props: NavbarProps) => {
	const { className = classes.navbar } = props;
	const isRedesigned = className === classes.navbar;

	const { t } = useTranslation(['translation', 'articles']);

	const { isOpen, closeHandler } = useModal({ isOpen: false });

	return (
		<header className={classNames(className, {}, [])}>
			{isRedesigned && (
				<>
					<Text className={classes.appName} theme={TextTheme.INVERTED} title={t('appName')} />
					<AppLink
						className={classes.createLink}
						to={RoutePath.article_create}
						theme={AppLinkTheme.SECONDARY}
					>
						{t('createArticle', { ns: 'articles' })}
					</AppLink>
				</>
			)}
			<HStack gap={16} className={classes.actions}>
				<AddNotificationsButton className={classes.links} />
				<AddMenuButton className={classes.links} onAuthModal={closeHandler} />
			</HStack>
			{/* <Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button> */}
			<LoginModal isOpen={isOpen} onClose={closeHandler} />
		</header>
	);
});

export const Navbar: FC<NavbarProps> = () => {
	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			off={<NavbarComponent className={classes.navbar} />}
			on={<NavbarComponent className={classes.navbarredesign} />}
		/>
	);
};
