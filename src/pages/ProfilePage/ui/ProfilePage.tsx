import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../../../entities/Profile';
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

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>{t('profile', { ns: 'pages' })}</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
