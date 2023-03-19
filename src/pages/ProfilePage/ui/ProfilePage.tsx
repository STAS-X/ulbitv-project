import { useAppDispatch } from 'app/providers/StoreProvider';
import { FC, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchProfileData, profileReducer } from '../../../entities/Profile';
//import classes from './ProfilePage.module.scss';

const redusers: ReducerList = {
	profile: profileReducer
};

export interface ProfilePageProps {
	className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo<ProfilePageProps>((props: ProfilePageProps) => {
	const { className } = props;

	const { t } = useTranslation(['pages']);
	const dispatch = useAppDispatch();

	const fetchProfileByUser = useCallback(async () => {
		const profileData = await dispatch(fetchProfileData());
		if (profileData.meta.requestStatus === 'fulfilled') {
			//dispatch(loginActions.setEmpty());
			console.log(`Profile data is '${JSON.stringify(profileData.payload)}'`);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchProfileByUser();

		return () => {
			console.log('profile unmount');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<div className={classNames('', {})}>{t('profile', { ns: 'pages' })}</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
