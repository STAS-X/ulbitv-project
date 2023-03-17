import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error'
}

export interface TextProps {
	className?: string;
	title?: string;
	content?: string;
	theme?: TextTheme;
}

export const Text: FC<TextProps> = memo((props) => {
	const { className, title, content, theme = TextTheme.PRIMARY } = props;

	return (
		<div className={classNames(classes.text, { [classes[theme]]: true }, [])}>
			{title && <p className={classes.title}>{title}</p>}
			{content && <p className={classes.content}>{content}</p>}
		</div>
	);
});
