import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesign/Text/Text';
import classes from './ProfileCard.module.scss';
import { Input } from '@/shared/ui/redesign/Input/Input';
import { Avatar } from '@/shared/ui/redesign/Avatar/Avatar';
import { CountrySelector } from '@/entities/Country';
import { CurrencySelector } from '@/entities/Currency';
import { useSelector } from 'react-redux';
import { ProfileData, ProfileFieldType, ValidateProfileError } from '../../model/types/profileSchema';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesign/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesign/Stack/HStack/HStack';
// eslint-disable-next-line stas-eslint-plugin/layer-imports, stas-eslint-plugin/import-public-api
import { getEditableProfileValidation } from '@/features/EditableProfileCard/model/selectors/getEditableProfile/getEditableProfileData';
import { Card } from '@/shared/ui/redesign/Card/Card';
import { Skeleton } from '@/shared/ui/redesign/Skeleton/Skeleton';

export interface ProfileCardProps {
	className?: string;
	isLoading?: boolean;
	readonly?: boolean;
	error?: string;
	data?: ProfileData;
	onChangeProfileFields: (type?: ProfileFieldType) => (value?: string) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
	const { data = {}, isLoading = false, error = '', onChangeProfileFields, readonly, className } = props;

	const { id: userId = '' } = useParams<{ id: string }>();

	//console.log(data, userId, 'get input data');
	const { t } = useTranslation(['profile', 'errors']);
	const validateError = useSelector(getEditableProfileValidation);

	const mods: Mods = {
		[classes.editing]: !readonly
	};

	const loadingContent = (
		<VStack className={classes.loading} align={'center'} justify={'center'} gap={48} max>
			<Skeleton width={100} height={100} border={'50%'} />
			<HStack gap={24} max>
				<VStack gap={32} max>
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
				</VStack>
				<VStack gap={32} max>
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
					<Skeleton width={'100%'} height={40} border={8} />
				</VStack>
			</HStack>
		</VStack>
	);

	return (
		<Card variant={'outline'} paddings={24} max>
			<HStack className={classNames('', mods, [className])} max>
				<VStack
					className={classNames('', { [classes.loading]: isLoading, [classes.error]: Boolean(error) })}
					align={'center'}
					justify={'center'}
					max
				>
					{error ? (
						<Text
							title={t('errorTitle', { ns: 'errors' })}
							content={t('errorApp', { ns: 'errors', message: t(error, { ns: 'errors', userId }) })}
							variant={'error'}
							align={'align-center'}
						/>
					) : isLoading ? (
						loadingContent
					) : (
						<VStack data-testid={'ProfileForm'} className={classes.profilecard} gap={48} max>
							{data?.avatar && (
								<HStack justify={'center'} max>
									<Avatar className={classes.avatar} size={100} src={data?.avatar} />
								</HStack>
							)}
							<HStack gap={24} max>
								<VStack gap={32} max>
									<Input
										dataTestId={'ProfileCard.FirstName'}
										className={classes.input}
										value={data?.first}
										readonly={readonly}
										label={t('name', { ns: 'profile' })}
										validation={t(
											validateError?.[ValidateProfileError.INCORRECT_USER_FIRST] || '',
											{
												ns: 'profile'
											}
										)}
										onChange={onChangeProfileFields(ProfileFieldType.FIRST)}
									/>
									<Input
										dataTestId={'ProfileCard.LastName'}
										className={classes.input}
										value={data?.lastname}
										readonly={readonly}
										label={t('surname', { ns: 'profile' })}
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
										label={t('age', { ns: 'profile' })}
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
										label={t('username', { ns: 'profile' })}
										validation={t(validateError?.[ValidateProfileError.INCORRECT_USERNAME] || '', {
											ns: 'profile'
										})}
										onChange={onChangeProfileFields(ProfileFieldType.USERNAME)}
									/>
								</VStack>
								<VStack gap={32} max>
									<Input
										className={classes.input}
										value={data?.avatar}
										readonly={readonly}
										label={t('avatar', { ns: 'profile' })}
										validation={t(validateError?.[ValidateProfileError.INCORRECT_AVATAR] || '', {
											ns: 'profile'
										})}
										onChange={onChangeProfileFields(ProfileFieldType.AVATAR)}
									/>
									<Input
										className={classes.input}
										value={data?.city}
										readonly={readonly}
										label={t('city', { ns: 'profile' })}
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
							</HStack>
						</VStack>
					)}
				</VStack>
			</HStack>
		</Card>
	);
};
