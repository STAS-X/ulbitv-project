import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ProfileData } from '../model/types/profileSchema';
import { getProfileData } from '../model/selectors/getProfile/getProfileData';

interface ProfileProps {
	data?: ProfileData;
}

export const Profile: FC<ProfileProps> = () => {
	const profiledata = useSelector<StateSchema, ProfileData>(getProfileData);
	//const dispatch = useDispatch();

	return (
		<div
			data-testid="profile"
			style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start', marginTop: 25 }}
		>
			<h1 data-testid="profile-value">{`${profiledata.first} ${profiledata.lastname}`}</h1>
		</div>
	);
};
