import { ArticleTextBlock } from '../../model/types/articleSchema';
import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import classes from './ArticleTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleTextBlockComponentProps {
	className?: string;
	children?: ReactNode;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(
	(props: ArticleTextBlockComponentProps) => {
		const { block, className } = props;

		return (
			<div className={classNames(classes.articletextblockcomponent, {}, [className])}>
				{block.title && (
					<ToggleFeatures
						feature={'isAppRedesigned'}
						off={<Text title={block.title} className={classes.title} />}
						on={<TextRedesign title={block.title} className={classes.title} />}
					/>
				)}
				{block.paragraphs.map((paragraph) => (
					<ToggleFeatures
						key={paragraph}
						feature={'isAppRedesigned'}
						off={<Text content={paragraph} className={classes.paragraph} />}
						on={<TextRedesign content={paragraph} className={classes.paragraph} />}
					/>
				))}
			</div>
		);
	}
);
