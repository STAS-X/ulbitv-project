import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';
import classes from './ProfilePage.module.scss';
import { getUserData } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';

export interface ProfilePageProps {
	className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo<ProfilePageProps>((props: ProfilePageProps) => {
	const { className } = props;

	const userData = useSelector(getUserData);
	const { id: profileId = userData?.profileId } = useParams<{ id: string }>();

	const { t } = useTranslation(['pages']);

	return (
		<PageWrapper className={classes.profilepage}>
			<EditableProfileCard id={profileId} />
		</PageWrapper>
	);
});

export default ProfilePage;
