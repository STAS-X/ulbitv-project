import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import classes from './ProfileCard.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { CountrySelector } from '@/entities/Country';
import { CurrencySelector } from '@/entities/Currency';
import { useSelector } from 'react-redux';
import { ProfileData, ProfileFieldType, ValidateProfileError } from '../../model/types/profileSchema';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
// eslint-disable-next-line stas-eslint-plugin/layer-imports, stas-eslint-plugin/import-public-api
import { getEditableProfileValidation } from '@/features/EditableProfileCard/model/selectors/getEditableProfile/getEditableProfileData';

export interface ProfileCardProps {
	className?: string;
	isLoading?: boolean;
	readonly?: boolean;
	error?: string;
	data?: ProfileData;
	onChangeProfileFields: (type?: ProfileFieldType) => (value?: string) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
	const { data = {}, isLoading, error, onChangeProfileFields, readonly, className } = props;

	const { id: userId = '' } = useParams<{ id: string }>();

	//console.log(data, userId, 'get input data');
	const { t } = useTranslation(['profile', 'errors']);
	const validateError = useSelector(getEditableProfileValidation);

	const mods: Mods = {
		[classes.editing]: !readonly
	};

	return (
		<HStack className={classNames(classes.profilecard, mods, [className])} max>
			<VStack
				className={classNames(
					'',
					isLoading ? { [classes.loading]: true } : { [classes.error]: Boolean(error) }
				)}
				align={'center'}
				justify={'center'}
				max
			>
				{error ? (
					<Text
						title={t('errorTitle', { ns: 'errors' })}
						content={t('errorApp', { ns: 'errors', message: t(error, { ns: 'errors', userId }) })}
						theme={TextTheme.ERROR}
						align={TextAlign.CENTER}
					/>
				) : isLoading ? (
					<Loader />
				) : (
					<VStack gap={10} max>
						{data?.avatar && (
							<HStack justify={'center'} max>
								<Avatar className={classes.avatar} size={100} src={data?.avatar} />
							</HStack>
						)}
						<VStack data-testid={'ProfileForm'} gap={16}>
							<Input
								dataTestId={'ProfileCard.FirstName'}
								className={classes.input}
								value={data?.first}
								readonly={readonly}
								placeholder={t('name', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_USER_FIRST] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.FIRST)}
							/>
							<Input
								dataTestId={'ProfileCard.LastName'}
								className={classes.input}
								value={data?.lastname}
								readonly={readonly}
								placeholder={t('surname', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_USER_LAST] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.LAST)}
							/>
							<Input
								dataTestId={'ProfileCard.Age'}
								className={classes.input}
								value={data?.age}
								readonly={readonly}
								placeholder={t('age', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_AGE] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.AGE)}
							/>
							<Input
								dataTestId={'ProfileCard.UserName'}
								className={classes.input}
								value={data?.username}
								readonly={readonly}
								placeholder={t('username', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_USERNAME] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.USERNAME)}
							/>
							<Input
								className={classes.input}
								value={data?.avatar}
								readonly={readonly}
								placeholder={t('avatar', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_AVATAR] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.AVATAR)}
							/>
							<Input
								className={classes.input}
								value={data?.city}
								readonly={readonly}
								placeholder={t('city', { ns: 'profile' })}
								validation={t(validateError?.[ValidateProfileError.INCORRECT_CITY] || '', {
									ns: 'profile'
								})}
								onChange={onChangeProfileFields(ProfileFieldType.CITY)}
							/>
							<CountrySelector
								dataTestId={'ProfileCard.Country'}
								className={classes.input}
								value={data?.country}
								readonly={readonly}
								placeholder={t('country', { ns: 'profile' })}
								onChange={onChangeProfileFields(ProfileFieldType.COUNTRY)}
							/>
							<CurrencySelector
								dataTestId={'ProfileCard.Currency'}
								className={classes.input}
								value={data?.currency}
								readonly={readonly}
								placeholder={t('currency', { ns: 'profile' })}
								onChange={onChangeProfileFields(ProfileFieldType.CURRENCY)}
							/>
						</VStack>
					</VStack>
				)}
			</VStack>
		</HStack>
	);
};
