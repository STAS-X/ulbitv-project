import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children?: ReactNode;
	element?: HTMLElement;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const Portal: FC<PortalProps> = (props) => {
	const { children, element = document.body } = props;

	return createPortal(children, element);
};
