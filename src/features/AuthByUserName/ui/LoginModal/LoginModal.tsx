import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginFormLazy as LoginForm } from '../LoginForm/LoginFormLazy';

export interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
	const [slowClose, setSlowClose] = useState(isOpen);

	const onAuth = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	useEffect(() => {
		const sleepForTime = async (ms: number) =>
			await new Promise((resolve) => setTimeout(() => resolve(setSlowClose(isOpen)), ms));
		isOpen ? void sleepForTime(0) : void sleepForTime(500);
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className ?? ''])}>
			{slowClose && <LoginForm isOpen={isOpen} onSuccess={onAuth} />}
		</Modal>
	);
};
