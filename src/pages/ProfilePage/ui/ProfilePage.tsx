import { useAppDispatch } from 'app/providers/StoreProvider';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	fetchProfileData,
	getProfileError,
	getProfileIsLoading,
	getProfileReadOnly,
	profileActions,
	ProfileCard,
	ProfileData,
	profileReducer
} from 'entities/Profile';
import { useSelector } from 'react-redux';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { getProfileData, getProfileFormData } from 'entities/Profile/model/selectors/getProfile/getProfileData';
import { ProfileFieldType } from 'entities/Profile/ui/ProfileCard/ProfileCard';
import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';
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
	const formData = useSelector(getProfileFormData);
	const error = useSelector(getProfileError);
	const isLoading = useSelector(getProfileIsLoading);
	const readonly = useSelector(getProfileReadOnly);
	const profileData = useSelector(getProfileData);

	const [isDirty, setIsDirty] = useState(false);

	const fetchProfileByUser = useCallback(async () => {
		const profileData = await dispatch(fetchProfileData());
		if (profileData.meta.requestStatus === 'fulfilled') {
			//dispatch(loginActions.setEmpty());
			console.log(`Profile data is '${JSON.stringify(profileData.payload)}'`);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchProfileByUser();
		console.log('profile refreshed');
		return () => {
			console.log('profile unmount');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const checkFormDirty = () => {
			let hasChanges = false;
			Object.entries(formData ?? {}).forEach(([key, value]) => {
				if (profileData?.[key as unknown as keyof ProfileData] !== value) {
					console.log(key, profileData?.[key as unknown as keyof ProfileData], 'different value');
					hasChanges = true;
					return;
				}
			});
			setIsDirty(hasChanges);
		};
		checkFormDirty();
	}, [formData, profileData]);

	const onChangeProfileForm = useCallback(
		(fieldType?: ProfileFieldType) => {
			switch (fieldType) {
				case ProfileFieldType.FIRST:
					return (value?: any) => dispatch(profileActions.updateProfile({ first: (value as string) || '' }));
				case ProfileFieldType.LAST:
					return (value?: any) => dispatch(profileActions.updateProfile({ lastname: (value as string) || '' }));
				case ProfileFieldType.AGE:
					return (value?: any) => dispatch(profileActions.updateProfile({ age: (value as number) || 0 }));

				case ProfileFieldType.CITY:
					return (value?: any) => dispatch(profileActions.updateProfile({ city: (value as string) || '' }));

				case ProfileFieldType.COUNTRY:
					return (value?: any) =>
						dispatch(profileActions.updateProfile({ country: (value as Country) || Country.Russia }));

				case ProfileFieldType.CURRENCY:
					return (value?: any) =>
						dispatch(profileActions.updateProfile({ currency: (value as Currency) || Currency.RUB }));
				case ProfileFieldType.USERNAME:
					return (value?: any) => dispatch(profileActions.updateProfile({ username: (value as string) || '' }));
				case ProfileFieldType.AVATAR:
					return (value?: any) => dispatch(profileActions.updateProfile({ avatar: (value as string) || '' }));

				default:
					return (value?: any) => {
						console.log(value);
					};
			}
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<div className={classNames('', {})}>
				<ProfilePageHeader isDirty={isDirty} />
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readonly}
					onChangeProfileFields={onChangeProfileForm}
				/>
			</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
