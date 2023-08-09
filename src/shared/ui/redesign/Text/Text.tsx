import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Text.module.scss';

type TextVariant = 'primary' | 'accent' | 'error';
type TextAlign = 'align-right' | 'align-left' | 'align-center';
type TextSize = 's' | 'm' | 'l';

export interface TextProps {
	className?: string;
	title?: string | null;
	content?: string | null;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	dataTestId?: string;
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const sizeToHeaderTag: Record<TextSize, HeaderTag> = {
	l: 'h1',
	m: 'h2',
	s: 'h3'
};

/**
 * Используем новые компоненты из папки redesigned
 */
export const Text: FC<TextProps> = memo((props: TextProps) => {
	const {
		className,
		title = '',
		size = 'm',
		content = '',
		align = 'align-left',
		variant = 'primary',
		dataTestId = 'TextError'
	} = props;

	const TagHeader = sizeToHeaderTag[size];

	const additionalClasses = [classes[variant], classes[align], classes[size], className];

	return (
		<div className={classNames(classes.text, {}, [...additionalClasses])}>
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
