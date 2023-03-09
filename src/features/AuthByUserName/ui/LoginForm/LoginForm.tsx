import { StateSchema } from 'app/providers/StoreProvider';
import { getLogin } from 'features/AuthByUserName/model/selectors/getUserData/getLoginData';
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { LoginSchema } from 'features/AuthByUserName/model/types/loginSchema';
import { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
	className?: string;
	isOpen: boolean;
	onAuth: () => void;
}

export const LoginForm: FC<LoginFormProps> = memo(({ className, isOpen, onAuth }) => {
	const { t } = useTranslation(['translation']);
	const userNameRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const { username: login, password, error, isLoading } = useSelector<StateSchema, LoginSchema>(getLogin);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUserName(value));
		},
		[dispatch]
	);
	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setUserPassword(value));
		},
		[dispatch]
	);

	const onLoginClick = useCallback(async () => {
		const userData = await dispatch(loginByUsername({ username: login, password }));
		if (!userData?.error) onAuth(); 
	}, [dispatch, onAuth, login, password]);

	useEffect(() => {
		const inputRef = userNameRef.current;

		if (isOpen && inputRef instanceof HTMLInputElement) {
			if (inputRef.selectionEnd) inputRef.setSelectionRange(0, 0);
			inputRef.focus();
		}

		return () => {
			if (inputRef instanceof HTMLInputElement) inputRef.blur();
		};
	}, [isOpen, userNameRef]);

	return (
		<div className={classNames(classes.loginform, {}, [className])}>
			{error && <div>{error}</div>}
			<Input ref={userNameRef} type="text" className={classes.input} onChange={onChangeUsername} value={login} />
			<Input ref={null} type="text" className={classes.input} onChange={onChangePassword} value={password} />
			<Button theme={ButtonTheme.OUTLINE} className={classes.loginbtn} disabled={isLoading} onClick={onLoginClick}>
				{t('login')}
			</Button>
		</div>
	);
});
