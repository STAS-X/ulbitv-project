import { useCallback, useState } from 'react';

interface UseHoverFunc {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverFunc];

export const useHover = () => {
	const [isHover, setIsHover] = useState(false);

	const onMouseEnter = useCallback(() => {
		setIsHover(true);
	}, [setIsHover]);
	const onMouseLeave = useCallback(() => {
		setIsHover(false);
	}, [setIsHover]);

	return [isHover, { onMouseEnter, onMouseLeave }] as UseHoverResult;
};
