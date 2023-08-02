import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDown } from '@/shared/ui/deprecated/DropDown/DropDown';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from '@/app/providers/StoreProvider';
import { userActions, UserData, getUserData, getUserIsAdmin } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/config/routeConfig';
import { useLocation, useNavigate } from '@/shared/lib/hooks/useRouterUtils';

interface AddMenuButtonProps {
	className?: string;
	onAuthModal: () => void;
}

export const AddMenuButton: FC<AddMenuButtonProps> = memo((props: AddMenuButtonProps) => {
	const { className, onAuthModal } = props;

	const { t } = useTranslation(['translation']);

	const dispatch = useAppDispatch();

	const userdata = useSelector<StateSchema, UserData | undefined>(getUserData);
	const isAdmin = useSelector<StateSchema, boolean>(getUserIsAdmin);
	const location = useLocation(); // Your hook to get login status
	const navigate = useNavigate();

	const showAuthModal = useCallback(() => {
		if (onAuthModal) onAuthModal();
	}, [onAuthModal]);

	const setLogOut = useCallback(() => {
		dispatch(userActions.logOut());
		navigate('/', { state: location, replace: true });
	}, [dispatch, navigate, location]);

	const menuItems = useMemo(
		() =>
			[
				{ content: t('adminMenu'), href: getRouteAdminPanel(), disabled: !Boolean(isAdmin) },
				{
					content: t('profileMenu'),
					href: getRouteProfile(`${userdata?.id ?? ''}`),
					disabled: !Boolean(userdata)
				},
				{ content: t(userdata ? 'logout' : 'login'), onClick: userdata ? setLogOut : showAuthModal }
			].filter(Boolean),
		[t, userdata, isAdmin, showAuthModal, setLogOut]
	);

	return (
		<DropDown
			className={classNames('', {}, [className])}
			items={menuItems}
			trigger={<Avatar size={30} border={'50%'} src={userdata?.avatar || ''} />}
		/>
	);
});
