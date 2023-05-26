import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
	getEditableProfileData,
	getEditableProfileFormData,
	getEditableProfileError,
	getEditableProfileIsLoading,
	getEditableProfileReadOnly
} from '../../model/selectors/getEditableProfile/getEditableProfileData';
import { ProfileCard, ProfileFieldType } from 'entities/Profile/ui/ProfileCard/ProfileCard';
import { ProfileData } from 'entities/Profile/model/types/profileSchema';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { fetchEditableProfileData } from '../../model/services/fetchEditableProfileData/fetchEditableProfileData';
import { editableProfileActions, editableProfileReducer } from '../../model/slices/editableProfileSlices';
import { EditableProfileCardHeader } from '../EditableProfilePageHeader/EditableProfileCardHeader';
import { VStack } from 'shared/ui/Stack';
import { getUserData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';

const redusers: ReducerList = {
	profile: editableProfileReducer
};

export interface EditableProfileCardProps {
	className?: string;
	id?: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = memo((props: EditableProfileCardProps) => {
	const { className, id: profileId = '' } = props;

	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const [isDirty, setIsDirty] = useState(false);

	const formData = useSelector(getEditableProfileFormData);
	const error = useSelector(getEditableProfileError);
	const isLoading = useSelector(getEditableProfileIsLoading);
	const readonly = useSelector(getEditableProfileReadOnly);
	const profileData = useSelector(getEditableProfileData);

	const userData = useSelector(getUserData);
	const isEdit = useMemo(() => userData?.profileId === profileId, [userData, profileId]);

	const fetchProfileByUser = useCallback(async () => {
		if (_PROJECT_ !== 'frontend') return;

		if (profileId) {
			const profileData = await dispatch(fetchEditableProfileData({ profileId }));
			if (profileData.meta.requestStatus === 'fulfilled') {
				//dispatch(loginActions.setEmpty());
				console.log(`Profile data is '${JSON.stringify(profileData.payload)}'`);
			}
		}
	}, [dispatch, profileId]);

	useEffect(() => {
		fetchProfileByUser();
		//if (formData) dispatch(profileActions.checkProfileValidation(formData));
		console.log('profile validated');
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
					//console.log(key, profileData?.[key as unknown as keyof ProfileData], 'different value');
					hasChanges = true;
					return;
				}
			});
			setIsDirty(hasChanges);
		};
		checkFormDirty();
	}, [formData, setIsDirty, profileData]);

	useEffect(() => {
		if (formData) dispatch(editableProfileActions.checkProfileValidation(formData));
	}, [dispatch, formData]);

	const onChangeProfileForm = useCallback(
		(fieldType?: ProfileFieldType) => {
			switch (fieldType) {
				case ProfileFieldType.FIRST:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ first: (value as string) || '' }));
				case ProfileFieldType.LAST:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ lastname: (value as string) || '' }));
				case ProfileFieldType.AGE:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ age: value }));

				case ProfileFieldType.CITY:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ city: (value as string) || '' }));

				case ProfileFieldType.COUNTRY:
					return (value?: any) =>
						dispatch(editableProfileActions.updateProfile({ country: (value as Country) || Country.Russia }));

				case ProfileFieldType.CURRENCY:
					return (value?: any) =>
						dispatch(editableProfileActions.updateProfile({ currency: (value as Currency) || Currency.RUB }));
				case ProfileFieldType.USERNAME:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ username: (value as string) || '' }));
				case ProfileFieldType.AVATAR:
					return (value?: any) => dispatch(editableProfileActions.updateProfile({ avatar: (value as string) || '' }));

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
			<VStack dataTestId={'ProfileCard'} className={classNames('', {}, [className])} gap={10} max={true}>
				<EditableProfileCardHeader isDirty={isDirty} isEdit={isEdit} />
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readonly}
					onChangeProfileFields={onChangeProfileForm}
				/>
			</VStack>
		</DynamicModuleLoader>
	);
});
