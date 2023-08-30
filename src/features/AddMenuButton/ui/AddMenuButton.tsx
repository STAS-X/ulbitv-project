import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDown as DropDownDeprecated } from '@/shared/ui/deprecated/DropDown/DropDown';
import { DropDown } from '@/shared/ui/redesign/DropDown/DropDown';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Avatar } from '@/shared/ui/redesign/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from '@/app/providers/StoreProvider';
import { userActions, UserData, getUserData, getUserIsAdmin } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/config/routeConfig';
import { useLocation, useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { getRouteSettings } from '../../../shared/config/routeConfig/routeConfig';

interface AddMenuButtonProps {
	className?: string;
	onAuthModal?: () => void;
}

export const AddMenuButtonComponent: FC<AddMenuButtonProps> = memo((props: AddMenuButtonProps) => {
	const { className = '', onAuthModal } = props;

	const { t } = useTranslation(['translation']);

	const dispatch = useAppDispatch();

	const userdata = useSelector<StateSchema, UserData | undefined>(getUserData);
	const isAdmin = useSelector<StateSchema, boolean>(getUserIsAdmin);
	const location = useLocation(); // Your hook to get login status
	const navigate = useNavigate();

	const isRedesigned = className === 'redesigned';

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
				{
					content: t('settingsMenu'),
					href: getRouteSettings(),
					disabled: !Boolean(userdata)
				},
				{ content: t(userdata ? 'logout' : 'login'), onClick: userdata ? setLogOut : showAuthModal }
			].filter(Boolean),
		[t, userdata, isAdmin, showAuthModal, setLogOut]
	);

	return isRedesigned ? (
		<DropDown
			className={classNames('', {}, [className])}
			items={menuItems}
			trigger={
				<Avatar
					variant={userdata?.avatar ? 'none' : 'filter'}
					size={40}
					border={'50%'}
					src={userdata?.avatar}
				/>
			}
		/>
	) : (
		<DropDownDeprecated
			className={classNames('', {}, [className])}
			items={menuItems}
			trigger={<AvatarDeprecated size={30} border={'50%'} src={userdata?.avatar} />}
		/>
	);
});

export const AddMenuButton: FC<AddMenuButtonProps> = (props: AddMenuButtonProps) => {
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<AddMenuButtonComponent {...props} className={'classic'} />}
			on={<AddMenuButtonComponent {...props} className={'redesigned'} />}
		/>
	);
};
