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
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation(['translation']);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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
		<div className={classNames(classes.navbar, {}, [className])}>
			<Button theme={ButtonTheme.INVERTED} className={classes.links} onClick={userdata ? setLogOut : showAuthModal}>
				{t(userdata ? 'logout' : 'login')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={closeAuthModal} />
		</div>
	);
});
