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
	const [isNeedRerended, setIsNeedRerended] = useState(false);
	const [isNextScroll, setIsNextScroll] = useState(true);
	const scrollElement = useRef<HTMLElement | null>(null);

	const { pathname } = useLocation();
	console.log('scroll data hook');
	const scrollDetecting = useCallback(
		(e: Event) => {
			if (e.currentTarget && isNextScroll) {
				setIsScrolling(Boolean((e.currentTarget as HTMLElement).scrollTop > 0));
			}
		},
		[isNextScroll]
	);

	const handleScrollToTop = useCallback(() => {
		if (scrollElement.current && isNextScroll && isScrolling && isNeedRerended) {
			(scrollElement.current as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
			setIsScrolling(false);
			setIsNextScroll(false);
			setTimeout(() => setIsNextScroll(true), 1000);
		}
	}, [isNextScroll, isScrolling, isNeedRerended]);

	useEffect(() => {
		console.log(isNeedRerended, isRecheck, `check and rerender`);
		if (!isNeedRerended) {
			setTimeout(() => setIsRecheck(!isRecheck), 500);
		}
	}, [isNeedRerended, isRecheck]);

	useEffect(() => {
		console.log(pathname, scrollElement.current, hasScroll, `check pathname`);
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
				scrollElement.current.addEventListener('scroll', scrollDetecting);
				setIsNeedRerended(true);
			}
		} else {
			setHasScroll(false);
		}

		return () => {
			if (scrollElement.current) scrollElement.current.removeEventListener('scroll', scrollDetecting);
			scrollElement.current = null;
		};
	}, [pathname, isRecheck, isNextScroll, isScrolling, hasScroll, scrollDetecting]);

	const returnResult = useMemo(() => {
		return {
			isScrolling,
			hasScroll,
			onScrollToTop: handleScrollToTop
		};
	}, [isScrolling, hasScroll, handleScrollToTop]);

	return returnResult;
};
