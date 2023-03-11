import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { UserData, userActions, UserSchema } from '..';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { getUserData } from 'entities/User/model/selectors/getUser/getUser';

interface UserProps {
	counterValue?: number;
}

export const User: FC<UserProps> = () => {
	const userdata = useSelector<StateSchema, UserData>(getUserData);
	//const dispatch = useDispatch();

	return (
		<div
			data-testid="user"
			style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start', marginTop: 25 }}
		>
			<h1 data-testid="user-value">{userdata.username}</h1>
		</div>
	);
};
