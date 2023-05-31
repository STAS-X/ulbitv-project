import { useCallback, useEffect } from 'react';

interface UseModalProps {
	onClose: () => void;
	animationDelay?: number;
}

interface UseModalReturn {
	closeHandler: () => void;
}

export const useModal = (props: UseModalProps): UseModalReturn => {
	const { onClose, animationDelay = 300 } = props;

	const closeHandler = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
				if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
			}
		},
		[closeHandler]
	);

	//const contentClick = (e: React.MouseEvent) => e.stopPropagation();
	useEffect(() => {
		document.documentElement.style.setProperty('--animation-delay', `${animationDelay}ms`);
	}, [animationDelay]);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return {
		closeHandler
	};
};
