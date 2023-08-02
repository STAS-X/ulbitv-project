import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
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
	title?: string | null;
	content?: string | null;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
	dataTestId?: string;
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const sizeToHeaderTag: Record<TextSize, HeaderTag> = {
	size_l: 'h1',
	size_m: 'h2',
	size_s: 'h3'
};

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const Text: FC<TextProps> = memo((props: TextProps) => {
	const {
		className,
		title = '',
		size = TextSize.M,
		content = '',
		align = TextAlign.LEFT,
		theme = TextTheme.PRIMARY,
		dataTestId = 'TextError'
	} = props;

	const TagHeader = sizeToHeaderTag[size];

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[align]]: true,
		[classes[size]]: true
	};

	return (
		<div className={classNames(classes.text, mods, [className])}>
			{title && (
				<TagHeader data-testid={`${dataTestId}.Header`} className={classes.title}>
					{title}
				</TagHeader>
			)}
			{content && (
				<p data-testid={`${dataTestId}.Message`} className={classNames(classes.content)}>
					{content}
				</p>
			)}
		</div>
	);
});
