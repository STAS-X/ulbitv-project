import { StateSchema, useAppDispatch } from '@/app/providers/StoreProvider';
import { getLogin } from '../../model/selectors/getUserData/getLoginData';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';
import { LoginSchema } from '../../model/types/loginSchema';
import { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button as ButtonRedesign } from '@/shared/ui/redesign/Button/Button';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Input as InputRedesign } from '@/shared/ui/redesign/Input/Input';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import classes from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '@/shared/ui/redesign/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';

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

	const onLoginClick = useCallback(() => {
		(async () => {
			const userData = await dispatch(loginByUsername({ username: login, password }));
			if (userData.meta.requestStatus === 'fulfilled') {
				//dispatch(loginActions.setEmpty());
				console.log(`User '${login}' login`);
				onSuccess();
			}
		})();
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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Card variant={'light'} paddings={24} className={classNames(classes.loginformredesign, {}, [className])}>
						<VStack gap={10} max>
							<TextRedesign title={t('authTitle')} />
							{error && (
								<TextRedesign
									content={t('errorApp', { ns: 'errors', message: error })}
									variant={'error'}
								/>
							)}
							<InputRedesign
								placeholder={t('userName')}
								ref={userNameRef}
								type="text"
								onChange={onChangeUsername}
								value={login}
							/>
							<InputRedesign
								placeholder={t('userPass')}
								type="text"
								className={classes.input}
								onChange={onChangePassword}
								value={password}
							/>
							<HStack justify="end" max>
								<ButtonRedesign
									className={classes.loginbtnredesign}
									variant={'outline'}
									disabled={isLoading}
									onClick={onLoginClick}
								>
									{t('login')}
								</ButtonRedesign>
							</HStack>
						</VStack>
					</Card>
				}
				off={
					<div className={classNames(classes.loginform, {}, [className])}>
						<Text title={t('authTitle')} />
						{error && (
							<Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />
						)}
						<Input
							ref={userNameRef}
							type="text"
							className={classes.input}
							onChange={onChangeUsername}
							value={login}
						/>
						<Input type="text" className={classes.input} onChange={onChangePassword}
value={password} />
						<Button
							theme={ButtonTheme.OUTLINE}
							className={classes.loginbtn}
							disabled={isLoading}
							onClick={onLoginClick}
						>
							{t('login')}
						</Button>
					</div>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
