import { FC, ReactNode } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import { TestProps } from '../../../types/test/tests';

export interface PageWrapperProps extends TestProps {
	className?: string;
	children: ReactNode;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const PageWrapper: FC<PageWrapperProps> = (props: PageWrapperProps) => {
	const { children, className } = props;

	return (
		<section data-testid={props['data-testid'] ?? 'Page'} className={classNames('page-wrapper', {}, [className])}>
			{children}
		</section>
	);
};
