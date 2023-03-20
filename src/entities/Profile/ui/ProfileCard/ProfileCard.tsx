import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getProfileData, getProfileError, getProfileIsLoading } from '../../model/selectors/getProfile/getProfileData';
import classes from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
	const { t } = useTranslation(['pages', 'profile']);
	const data = useSelector(getProfileData);
	const error = useSelector(getProfileError);
	const isLoading = useSelector(getProfileIsLoading);

	return (
		<div className={classNames(classes.profilecard, {}, [className])}>
			<div className={classes.header}>
				<Text title={t('profile', { ns: 'pages' })} />
				<Button className={classes.editbtn} theme={ButtonTheme.OUTLINE}>
					{t('edit', { ns: 'profile' })}
				</Button>
			</div>
			<div className={classes.data}>
				<Input className={classes.input} value={data?.first} placeholder={t('name', { ns: 'profile' })} />
				<Input className={classes.input} value={data?.lastname} placeholder={t('surname', { ns: 'profile' })} />
			</div>
		</div>
	);
};
