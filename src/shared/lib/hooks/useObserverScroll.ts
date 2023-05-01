import { MutableRefObject, useEffect } from 'react';

export interface ObserverScrollOptions {
	triggerRef: MutableRefObject<HTMLDivElement>;
	callback?: () => void;
}

export const useObserverScroll = (props: ObserverScrollOptions) => {
	const { callback, triggerRef } = props;

	useEffect(() => {
		const options = {
			root: document.querySelector('div.page-wrapper'),
			rootMargin: '20px',
			threshold: 1.0
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
		const observer = new IntersectionObserver(([entery]) => {
			if (entery.isIntersecting) {
				console.log('intersecting find');
				if (callback) callback();
			}
		}, options);

		if (triggerRef.current) observer.observe(triggerRef.current);

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			if (observer && triggerRef.current) observer.unobserve(triggerRef.current);
			console.log('unsubscribe');
		};
	}, [triggerRef, callback]);
};
