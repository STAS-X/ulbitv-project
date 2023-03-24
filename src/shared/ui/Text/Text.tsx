import { FC, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error'
}

export enum TextAlign {
	RIGHT = 'align-right',
	LEFT = 'align-left',
	CENTER = 'align-center'
}

export interface TextProps {
	className?: string;
	title?: string;
	content?: string;
	theme?: TextTheme;
	align?: TextAlign;
}

export const Text: FC<TextProps> = memo((props: TextProps) => {
	const { className, title, content, align = TextAlign.LEFT, theme = TextTheme.PRIMARY } = props;

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[align]]: true
	};

	return (
		<div className={classNames(classes.text, mods, [className])}>
			{title && <p className={classes.title}>{title}</p>}
			{content && <p className={classNames(classes.content)}>{content}</p>}
		</div>
	);
});
