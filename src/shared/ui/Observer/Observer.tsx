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
	const { onScrollEnd = () => null, children, className } = props;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	useObserverScroll({
		triggerRef,
		callback: onScrollEnd
	});

	return (
		<div className={classNames('', {}, [className])}>
			{children}
			{<div ref={triggerRef} className={classes.trigger}></div>}
		</div>
	);
};
