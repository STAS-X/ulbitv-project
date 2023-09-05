import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ScrollToTop.module.scss';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ScrollButton } from '@/features/ScrollButton';

export interface ScrollToTopProps {
	className?: string;
}

export const ScrollToTop: FC<ScrollToTopProps> = ({ className = '' }) => {
	return (
		<VStack className={classNames(classes.scrolltoolbar, {}, [className])} justify={'center'} align={'center'}
max>
			<ScrollButton />
		</VStack>
	);
};
