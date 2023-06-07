import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store';
import { getLogin } from '@/features/AuthByUserName/model/selectors/getUserData/getLoginData';
import { loginByUsername } from '@/features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '@/features/AuthByUserName/model/slices/loginSlice';
import { LoginSchema } from '@/features/AuthByUserName/model/types/loginSchema';
import { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
	className?: string;
	isOpen: boolean;
	onSuccess: () => void;
}

const reducers: ReducerList = {
	loginForm: loginReducer
};

const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
	const { className, isOpen, onSuccess } = props;
	const { t } = useTranslation(['translation', 'errors']);
	const userNameRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const {
		username: login,
		password,
		error,
		isLoading
	} = useSelector<StateSchema, LoginSchema | undefined>(getLogin) ?? {
		username: '',
		password: '',
		error: '',
		isLoading: false
	};

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
		if (userData.meta.requestStatus === 'fulfilled') {
			//dispatch(loginActions.setEmpty());
			console.log(`User '${login}' login`);
			onSuccess();
		}
	}, [dispatch, onSuccess, login, password]);

	const onEnterDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				void onLoginClick();
				if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
			}
		},
		[onLoginClick]
	);

	useEffect(() => {
		window.addEventListener('keydown', onEnterDown);

		return () => {
			window.removeEventListener('keydown', onEnterDown);
		};
	}, [onEnterDown]);

	useEffect(() => {
		const inputRef = userNameRef.current;
		if (isOpen && inputRef instanceof HTMLInputElement && !(document.activeElement instanceof HTMLInputElement))
			inputRef.focus();
		//if (inputRef.selectionStart && inputRef.selectionStart !== inputRef.selectionEnd)
		//	inputRef.setSelectionRange(inputRef.selectionStart, inputRef.selectionStart);
		//if (!(document.activeElement instanceof HTMLInputElement)) inputRef.focus();

		return () => {
			//if (inputRef instanceof HTMLInputElement) inputRef.blur();
			//if (error) dispatch(loginActions.setError(undefined));
		};
	}, [isOpen, login, password, error, dispatch, userNameRef]);

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<div className={classNames(classes.loginform, {}, [className])}>
				<Text title={t('authTitle')} />
				{error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />}
				<Input ref={userNameRef} type="text" className={classes.input} onChange={onChangeUsername} value={login} />
				<Input type="text" className={classes.input} onChange={onChangePassword} value={password} />
				<Button theme={ButtonTheme.OUTLINE} className={classes.loginbtn} disabled={isLoading} onClick={onLoginClick}>
					{t('login')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
