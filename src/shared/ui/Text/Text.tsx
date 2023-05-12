import { FC, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	ERROR = 'error'
}

export enum TextAlign {
	RIGHT = 'align-right',
	LEFT = 'align-left',
	CENTER = 'align-center'
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l'
}

export interface TextProps {
	className?: string;
	title?: string;
	content?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const sizeToHeaderTag: Record<TextSize, HeaderTag> = {
	size_l: 'h1',
	size_m: 'h2',
	size_s: 'h3'
};

export const Text: FC<TextProps> = memo((props: TextProps) => {
	const { className, title, size = TextSize.M, content, align = TextAlign.LEFT, theme = TextTheme.PRIMARY } = props;

	const TagHeader = sizeToHeaderTag[size];

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[align]]: true,
		[classes[size]]: true
	};

	return (
		<div className={classNames(classes.text, mods, [className])}>
			{title && <TagHeader className={classes.title}>{title}</TagHeader>}
			{content && <p className={classNames(classes.content)}>{content}</p>}
		</div>
	);
});
