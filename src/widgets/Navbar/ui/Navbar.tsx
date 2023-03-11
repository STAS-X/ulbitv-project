import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';
import { LoginModalLazy } from 'features/AuthByUserName/ui/LoginModal/LoginModalLazy';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions, UserData } from 'entities/User';
import { getUserData } from 'entities/User/model/selectors/getUser/getUser';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';

export interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation']);
	const dispatch = useAppDispatch();
	const userdata = useSelector<StateSchema, UserData>(getUserData);

	const [isAuthModal, setIsAuthModal] = useState(false);

	const closeAuthModal = useCallback(() => {
		console.log('closed modal');
		setIsAuthModal(false);
	}, []);

	const showAuthModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);
	const setLogOut = useCallback(() => {
		dispatch(userActions.logOut());
	}, [dispatch]);

	return (
		<div className={classNames(classes.navbar, {}, [className])}>
			<Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button>
			<LoginModalLazy isOpen={isAuthModal} onClose={closeAuthModal} />
		</div>
	);
};
