import { FC, MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useObserverScroll } from '../../lib/hooks/useObserverScroll';

export interface PageWrapperProps {
	className?: string;
	children: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = (props: PageWrapperProps) => {
	const { children, className } = props;

	return <section className={classNames('page-wrapper', {}, [className])}>{children}</section>;
};
