import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
	className?: string;
	isOpen: boolean;
	onAuth: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ className, isOpen, onAuth }) => {
	const { t } = useTranslation(['translation']);
	const userNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && userNameRef.current instanceof HTMLInputElement) userNameRef.current.focus();
	}, [isOpen, userNameRef]);

	return (
		<div className={classNames(classes.loginform, {}, [className])}>
			<Input ref={userNameRef} type="text" className={classes.input} />
			<Input ref={null} type="text" className={classes.input} />
			<Button theme={ButtonTheme.OUTLINE} className={classes.loginbtn} onClick={onAuth}>
				{t('login')}
			</Button>
		</div>
	);
};
