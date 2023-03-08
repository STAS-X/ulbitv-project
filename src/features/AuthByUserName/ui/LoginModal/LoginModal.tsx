import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { counterActions } from '../../../../entities/Counter';
import { getCounterLazy } from '../../../../entities/Counter/model/selectors/getCounter/getCounter';
import { LoginForm } from '../LoginForm/LoginForm';

export interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
	const isLazyModal = useSelector(getCounterLazy);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isOpen && !isLazyModal) dispatch(counterActions.setLazyModal(true));
		console.log(isOpen, isLazyModal, 'get lazy status');
	}, [isOpen, dispatch, isLazyModal]);

	if (isLazyModal) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
				<LoginForm isOpen={isOpen} onAuth={onClose} />
			</Modal>
		);
	}
	return null;
};
