import { FC, MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useObserverScroll } from '../../lib/hooks/useObserverScroll';
import classes from './Observer.module.scss';

export interface ObserverProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const Observer: FC<ObserverProps> = (props: ObserverProps) => {
	const { onScrollEnd, children, className } = props;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	useObserverScroll({
		triggerRef,
		callback: onScrollEnd
	});

	return (
		<div className={className}>
			{children}
			{onScrollEnd && <div ref={triggerRef} className={classes.trigger}></div>}
		</div>
	);
};
