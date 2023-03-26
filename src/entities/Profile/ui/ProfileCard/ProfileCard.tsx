import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { getProfileValidation, ProfileData } from 'entities/Profile';
import classes from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { CountrySelector } from 'entities/Country';
import { CurrencySelector } from 'entities/Currency';
import { useSelector } from 'react-redux';
import { ValidateProfileError } from 'entities/Profile/model/types/profileSchema';

export enum ProfileFieldType {
	FIRST = 'first',
	LAST = 'last',
	AGE = 'age',
	CITY = 'city',
	USERNAME = 'username',
	AVATAR = 'avatar',
	COUNTRY = 'country',
	CURRENCY = 'currency'
}

interface ProfileCardProps {
	className?: string;
	isLoading?: boolean;
	readonly?: boolean;
	error?: string;
	data?: ProfileData;
	onChangeProfileFields: (type?: ProfileFieldType) => (value?: string) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
	const { data = {}, isLoading, error, onChangeProfileFields, readonly, className } = props;

	const { t } = useTranslation(['profile', 'errors']);
	const validateError = useSelector(getProfileValidation);

	const mods: Mods = {
		[classes.editing]: !readonly
	};

	return (
		<div className={classNames(classes.profilecard, mods, [className])}>
			<div className={classNames('', isLoading ? { [classes.loading]: true } : { [classes.error]: Boolean(error) })}>
				{error ? (
					<Text
						title={t('errorTitle', { ns: 'errors' })}
						content={t('errorApp', { ns: 'errors', message: error })}
						theme={TextTheme.ERROR}
						align={TextAlign.CENTER}
					/>
				) : isLoading ? (
					<Loader />
				) : (
					<>
						{data?.avatar && (
							<div className={classes.avatarwrapper}>
								<Avatar className={classes.avatar} size={100} src={data?.avatar} />
							</div>
						)}
						{validateError?.[ValidateProfileError.INCORRECT_USER_FIRST] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_USER_FIRST] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.first}
							readonly={readonly}
							placeholder={t('name', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.FIRST)}
						/>
						{validateError?.[ValidateProfileError.INCORRECT_USER_LAST] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_USER_LAST] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.lastname}
							readonly={readonly}
							placeholder={t('surname', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.LAST)}
						/>
						{validateError?.[ValidateProfileError.INCORRECT_AGE] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_AGE] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.age}
							readonly={readonly}
							placeholder={t('age', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.AGE)}
						/>
						{validateError?.[ValidateProfileError.INCORRECT_USERNAME] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_USERNAME] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.username}
							readonly={readonly}
							placeholder={t('username', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.USERNAME)}
						/>
						{validateError?.[ValidateProfileError.INCORRECT_AVATAR] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_AVATAR] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.avatar}
							readonly={readonly}
							placeholder={t('avatar', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.AVATAR)}
						/>
						{validateError?.[ValidateProfileError.INCORRECT_CITY] && (
							<Text
								content={t(validateError[ValidateProfileError.INCORRECT_CITY] || '', {
									ns: 'profile'
								})}
								theme={TextTheme.ERROR}
								align={TextAlign.LEFT}
							/>
						)}
						<Input
							className={classes.input}
							value={data?.city}
							readonly={readonly}
							placeholder={t('city', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.CITY)}
						/>
						<CountrySelector
							className={classes.input}
							value={data?.country}
							readonly={readonly}
							placeholder={t('country', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.COUNTRY)}
						/>
						<CurrencySelector
							className={classes.input}
							value={data?.currency}
							readonly={readonly}
							placeholder={t('currency', { ns: 'profile' })}
							onChange={onChangeProfileFields(ProfileFieldType.CURRENCY)}
						/>
					</>
				)}
			</div>
		</div>
	);
};
