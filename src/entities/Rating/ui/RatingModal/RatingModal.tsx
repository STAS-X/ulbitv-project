import { FC, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/redesign/Modal/Modal';
import { FeedBackFormLazy as FeedBackForm } from '../FeedBackForm/FeedBackFormLazy';

export interface RatingModalProps {
	className?: string;
	isOpen: boolean;
	title?: string;
	onSuccess?: (feedback: string) => Promise<any>;
	onClose?: () => Promise<any>;
}

export const RatingModal: FC<RatingModalProps> = (props: RatingModalProps) => {
	const { className, isOpen, onSuccess, onClose, title } = props;
	const [slowClose, setSlowClose] = useState(isOpen);

	useEffect(() => {
		const sleepForTime = async (ms: number) =>
			await new Promise((resolve) => setTimeout(() => resolve(setSlowClose(isOpen)), ms));
		isOpen ? void sleepForTime(0) : void sleepForTime(500);
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
			{slowClose && <FeedBackForm title={title} onClose={onClose} onSuccess={onSuccess} />}
		</Modal>
	);
};
