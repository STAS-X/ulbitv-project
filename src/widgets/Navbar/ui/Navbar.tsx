import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';

export interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation']);

	const [isAuthModal, setIsAuthModal] = useState(false);

	const toggleAuthModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);

	return (
		<div className={classNames(classes.navbar, {}, [className])}>
			<Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={toggleAuthModal}>
				{t('login')}
			</Button>
			{/* eslint-disable-next-line */}
			<Modal isOpen={isAuthModal} onClose={toggleAuthModal}>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium inventore quas vel quis nihil distinctio ab
				pariatur debitis, alias, tempora provident fugiat officia itaque cum eligendi. Impedit distinctio consequuntur
				et!
			</Modal>
		</div>
	);
};
