import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { getCommonLazy } from 'entities/Common/model/selectors/getCommon/getCommon';
import { commonActions } from 'entities/Common';

export interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
	const isLazyModal = useSelector(getCommonLazy);
	const dispatch = useDispatch();
	const onAuth = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	useEffect(() => {
		if (isOpen && !isLazyModal) dispatch(commonActions.setLazyModal(true));
		console.log(isOpen, isLazyModal, 'get lazy status');
	}, [isOpen, dispatch, isLazyModal]);

	if (isLazyModal) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
				<LoginForm isOpen={isOpen} onAuth={onAuth} />
			</Modal>
		);
	}
	return null;
};
