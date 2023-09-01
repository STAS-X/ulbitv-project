import {memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ContentLayout.module.scss';

export interface ContentLayoutProps {
	className?: string;
	left?: ReactElement;
	content: ReactElement;
	right?: ReactElement;
	dataTestId?: string;
}

export const ContentLayout = memo((props: ContentLayoutProps) => {
	const { className, dataTestId = '', left, content, right } = props;
	//const { t } = useTranslation();

	return (
		<section data-testid={dataTestId} className={classNames(classes.ContentLayout, {}, [className])}>
			{left && <div className={classes.left}>{left}</div>}
			<div className={classes.content}>{content}</div>
			{right && <div className={classes.right}>{right}</div>}
		</section>
	);
});
