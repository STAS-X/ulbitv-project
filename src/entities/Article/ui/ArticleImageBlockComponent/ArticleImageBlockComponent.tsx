import { ArticleImageBlock } from '../../model/types/articleSchema';
import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';

export interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
	children?: ReactNode;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(
	(props: ArticleImageBlockComponentProps) => {
		const { block, className } = props;

		return (
			<div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
				<img src={block.src} alt={block.title} className={classes.img} />
				{block.title && <Text title={block.title} align={TextAlign.CENTER} />}
			</div>
		);
	}
);
