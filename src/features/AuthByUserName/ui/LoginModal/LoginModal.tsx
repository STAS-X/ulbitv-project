import { FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { getCommonLazy } from 'entities/Common/model/selectors/getCommon/getCommon';
import { commonActions } from 'entities/Common';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';
import { LoginFormLazy } from '../LoginForm/LoginFormLazy';

export interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
	const isLazyModal = useSelector(getCommonLazy);
	const dispatch = useAppDispatch();
	const onAuth = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	useEffect(() => {
		console.log(isOpen, 'is open');
		if (isOpen && !isLazyModal) dispatch(commonActions.setLazyModal(true));
	}, [isOpen, dispatch, isLazyModal]);

	if (isLazyModal) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
				{isOpen && <LoginFormLazy isOpen={isOpen} onAuth={onAuth} />}
			</Modal>
		);
	}
	return null;
};
