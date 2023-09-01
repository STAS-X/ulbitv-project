import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import ScrollIcon from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/redesign/Icon/Icon';
import { useScrollData } from '@/shared/lib/hooks/useScrollData';
import { useLocation } from 'react-router-dom';

export interface ScrollButtonProps {
	className?: string;
}

export const ScrollButton: FC<ScrollButtonProps> = memo((props: ScrollButtonProps) => {
	const { className = '' } = props;

	const { isScrolling, hasScroll, onScrollToTop } = useScrollData();

	console.log(onScrollToTop, hasScroll, isScrolling, 'is Scrolling');
	if (!hasScroll || !onScrollToTop) return null;

	return (
		<Icon
			Svg={ScrollIcon}
			variant={'scroll'}
			width={40}
			height={40}
			disabled={!isScrolling}
			onClick={onScrollToTop}
			clickable
		/>
	);
});
