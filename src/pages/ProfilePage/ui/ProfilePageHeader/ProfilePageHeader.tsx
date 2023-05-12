import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	getProfileError,
	getProfileIsLoading,
	getProfileReadOnly,
	getProfileValidation,
	profileActions,
	updateProfileData
} from 'entities/Profile';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import classes from './ProfilePageHeader.module.scss';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { HStack } from '../../../../shared/ui/Stack/HStack/HStack';

enum ProfileEditType {
	EDIT = 'edit',
	SAVE = 'save',
	CANCEL = 'cancel'
}

interface ProfilePageHeaderProps {
	className?: string;
	isDirty?: boolean;
	isEdit?: boolean;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
	const { isDirty = false, isEdit = false, className } = props;

	const { t } = useTranslation(['pages', 'profile']);
	const readonly = useSelector(getProfileReadOnly);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const validationError = useSelector(getProfileValidation);

	const dispatch = useAppDispatch();

	const updateProfileByForm = useCallback(async () => {
		if (_PROJECT_ === 'storybook') return;

		const profileData = await dispatch(updateProfileData());
		if (profileData.meta.requestStatus === 'fulfilled') {
			//dispatch(loginActions.setEmpty());
			console.log(`Profile data is '${JSON.stringify(profileData.payload)}'`);
		}
	}, [dispatch]);

	const onChangeEdit = useCallback(
		(type?: ProfileEditType) => async () => {
			if (readonly) {
				dispatch(profileActions.setProfileReadOnly(!readonly));
			} else {
				if (type == ProfileEditType.SAVE) {
					await updateProfileByForm();
				} else {
					dispatch(profileActions.cancelEditProfile());
				}
				dispatch(profileActions.setProfileReadOnly(!readonly));
			}
		},
		[dispatch, readonly, updateProfileByForm]
	);

	return (
		<HStack className={classNames(classes.profilepageheader, {}, [className])} justify={'between'} max={true}>
			<Text title={t('profile', { ns: 'pages' })} />
			<div className={classes.btns}>
				{isEdit &&
					(readonly ? (
						<Button
							className={classes.editbtn}
							theme={ButtonTheme.OUTLINE}
							onClick={onChangeEdit(ProfileEditType.EDIT)}
							disabled={isLoading || Boolean(error)}
						>
							{t('edit', { ns: 'profile' })}
						</Button>
					) : (
						<HStack gap={10}>
							<Button
								className={classes.editbtn}
								theme={ButtonTheme.OUTLINE}
								onClick={onChangeEdit(ProfileEditType.SAVE)}
								disabled={!isDirty || (isDirty && validationError && Object.keys(validationError).length > 0)}
							>
								{t('save', { ns: 'profile' })}
							</Button>
							<Button
								className={classes.editbtn}
								theme={ButtonTheme.OUTLINE_RED}
								onClick={onChangeEdit(ProfileEditType.CANCEL)}
							>
								{t('cancel', { ns: 'profile' })}
							</Button>
						</HStack>
					))}
			</div>
		</HStack>
	);
};
