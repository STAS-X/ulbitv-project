import { ArticleTextBlock } from 'entities/Article/model/types/articleSchema';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import classes from './ArticleTextBlockComponent.module.scss';

export interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(
	(props: ArticleTextBlockComponentProps) => {
		const { block, className } = props;

		return (
			<div className={classNames(classes.articletextblockcomponent, {}, [className])}>
				{block.title && <Text title={block.title} className={classes.title} />}
				{block.paragraphs.map((paragraph) => (
					<Text key={paragraph} content={paragraph} className={classes.paragraph} />
				))}
			</div>
		);
	}
);
