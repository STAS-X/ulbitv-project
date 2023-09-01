import { getRouteArticles } from '@/shared/config/routeConfig/routeConfig';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollData {
	isScrolling: boolean;
	hasScroll: boolean;
	onScrollToTop?: () => void;
}

export const useScrollData = (): UseScrollData => {

	const [isScrolling, setIsScrolling] = useState(false);
	const [isRecheck, setIsRecheck] = useState(false);
	const [hasScroll, setHasScroll] = useState(false);
	const [isNextScroll, setIsNextScroll] = useState(true);
	const scrollElement = useRef<HTMLElement | null>(null);

	const { pathname } = useLocation();

	const scrollDetecting = useCallback((e: Event) => {
		if (e.currentTarget && isNextScroll) {
			setIsScrolling(Boolean((e.currentTarget as HTMLElement).scrollTop > 0));
		}
	}, [isNextScroll]);

	const handleScrollToTop = useCallback((element: HTMLElement | null) => () => {
		console.log(element, isNextScroll, isScrolling, 'get function data')
		if (element && isNextScroll && isScrolling) {
			element.scrollTo({ top: 0, behavior: 'smooth' });
			setIsScrolling(false);
			setIsNextScroll(false);
			setTimeout(() => setIsNextScroll(true), 1000);
		}
	}, [isNextScroll, isScrolling]);


	useEffect(() => {
		if (pathname.includes(getRouteArticles())) {
			setHasScroll(true);
			if (pathname.includes(getRouteArticles() + '/')) {
				if (document.querySelector('[data-testid="ArticleDetailesPage"]')) {
					scrollElement.current = document.querySelector('[data-testid="ArticleDetailesPage"]');
				}
			} else {
				scrollElement.current = document.querySelector('[data-testid="ArticleList"]>div>div');

			}
			if (scrollElement.current) {
				(scrollElement.current).addEventListener('scroll', scrollDetecting);
			} else {
				console.log(scrollElement.current, 'scroll not found');
				setTimeout(() => setIsRecheck((prev) => !prev), 500);
			}
		} else {
			setHasScroll(false);
		}

		const scrollToElement = scrollElement.current;
		console.log(scrollElement.current, 'scroll element detected');

		return () => {
			if (scrollToElement) scrollToElement.removeEventListener('scroll', scrollDetecting);
			console.log('scroll unmount');
		}

	}, [pathname, isRecheck, isNextScroll, isScrolling, scrollElement, hasScroll, scrollDetecting]);

	const returnResult = useMemo(() => {
		return {
			isScrolling,
			hasScroll,
			onScrollToTop: scrollElement.current ? handleScrollToTop(scrollElement.current) : () => console.log('scroll element searching...')
		}
	}, [isScrolling, hasScroll, handleScrollToTop]);

	return returnResult;
};