import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';
import { LoginModalLazy } from 'features/AuthByUserName/ui/LoginModal/LoginModalLazy';

export interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation']);

	const [isAuthModal, setIsAuthModal] = useState(false);

	const closeAuthModal = useCallback(() => {
		console.log('closed modal');
		setIsAuthModal(false);
	}, []);

	const showAuthModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	return (
		<div className={classNames(classes.navbar, {}, [className])}>
			<Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={showAuthModal}>
				{t('login')}
			</Button>
			<LoginModalLazy isOpen={isAuthModal} onClose={closeAuthModal} />
		</div>
	);
};
