import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button as ButtonRedesign } from '@/shared/ui/redesign/Button/Button';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import classes from './ProfilePageHeader.module.scss';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { HStack } from '@/shared/ui/redesign/Stack/HStack/HStack';
import {
	getEditableProfileReadOnly,
	getEditableProfileIsLoading,
	getEditableProfileError,
	getEditableProfileValidation
} from '../../model/selectors/getEditableProfile/getEditableProfileData';
import { updateEditableProfileData } from '../../model/services/updateEditableProfileData/updateEditableProfileData';
import { editableProfileActions } from '../../model/slices/editableProfileSlices';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '@/shared/ui/redesign/Card/Card';

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

export const EditableProfileCardHeader: FC<ProfilePageHeaderProps> = (props) => {
	const { isDirty = false, isEdit = false, className } = props;

	const { t } = useTranslation(['pages', 'profile']);
	const readonly = useSelector(getEditableProfileReadOnly);
	const isLoading = useSelector(getEditableProfileIsLoading);
	const error = useSelector(getEditableProfileError);
	const validationError = useSelector(getEditableProfileValidation);

	const dispatch = useAppDispatch();

	const updateProfileByForm = useCallback(async () => {
		if (_PROJECT_ === 'storybook') return;

		const profileData = await dispatch(updateEditableProfileData());
		if (profileData.meta.requestStatus === 'fulfilled') {
			//dispatch(loginActions.setEmpty());
			console.log(`Profile data is '${JSON.stringify(profileData.payload)}'`);
		}
	}, [dispatch]);

	const onChangeEdit = useCallback(
		(type?: ProfileEditType) => {
			(async () => {
				if (readonly) {
					dispatch(editableProfileActions.setProfileReadOnly(!readonly));
				} else {
					if (type == ProfileEditType.SAVE) {
						await updateProfileByForm();
					} else {
						dispatch(editableProfileActions.cancelEditProfile());
					}
					dispatch(editableProfileActions.setProfileReadOnly(!readonly));
				}
			})();
		},
		[dispatch, readonly, updateProfileByForm]
	);

	return (
		<HStack
			dataTestId={'ProfileCard.Header'}
			className={classNames(classes.profilepageheader, {}, [className])}
			justify={'between'}
			max
		>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				off={
					<>
						<Text title={t('profile', { ns: 'pages' })} />
						<div className={classes.btns}>
							{isEdit &&
								(readonly ? (
									<Button
										dataTestId={'ProfileCard.EditBtn'}
										className={classes.editbtn}
										theme={ButtonTheme.OUTLINE}
										onClick={() => {
											onChangeEdit(ProfileEditType.EDIT);
										}}
										disabled={isLoading || Boolean(error)}
									>
										{t('edit', { ns: 'profile' })}
									</Button>
								) : (
									<HStack gap={10}>
										<Button
											dataTestId={'ProfileCard.SaveBtn'}
											className={classes.editbtn}
											theme={ButtonTheme.OUTLINE}
											onClick={() => {
												onChangeEdit(ProfileEditType.SAVE);
											}}
											disabled={
												!isDirty ||
												(isDirty && validationError && Object.keys(validationError).length > 0)
											}
										>
											{t('save', { ns: 'profile' })}
										</Button>
										<Button
											dataTestId={'ProfileCard.CancelBtn'}
											className={classes.editbtn}
											theme={ButtonTheme.OUTLINE_RED}
											onClick={() => {
												onChangeEdit(ProfileEditType.CANCEL);
											}}
										>
											{t('cancel', { ns: 'profile' })}
										</Button>
									</HStack>
								))}
						</div>
					</>
				}
				on={
					<Card paddings={24} border={'partial'} max>
						<HStack justify={'between'} max>
							<TextRedesign title={t('profile', { ns: 'pages' })} />
							{isEdit &&
								(readonly ? (
									<ButtonRedesign
										dataTestId={'ProfileCard.EditBtn'}
										className={classes.editbtn}
										variant={'outline'}
										onClick={() => {
											onChangeEdit(ProfileEditType.EDIT);
										}}
										disabled={isLoading || Boolean(error)}
									>
										{t('edit', { ns: 'profile' })}
									</ButtonRedesign>
								) : (
									<HStack gap={10}>
										<ButtonRedesign
											dataTestId={'ProfileCard.SaveBtn'}
											className={classNames(classes.editbtn)}
											variant={'success'}
											onClick={() => {
												onChangeEdit(ProfileEditType.SAVE);
											}}
											disabled={
												!isDirty ||
												(isDirty && validationError && Object.keys(validationError).length > 0)
											}
										>
											{t('save', { ns: 'profile' })}
										</ButtonRedesign>
										<ButtonRedesign
											dataTestId={'ProfileCard.CancelBtn'}
											className={classNames(classes.editbtn)}
											variant={'cancel'}
											onClick={() => {
												onChangeEdit(ProfileEditType.CANCEL);
											}}
										>
											{t('cancel', { ns: 'profile' })}
										</ButtonRedesign>
									</HStack>
								))}
						</HStack>
					</Card>
				}
			/>
		</HStack>
	);
};
