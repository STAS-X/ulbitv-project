import { ArticleImageBlock } from 'entities/Article/model/types/articleSchema';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';

export interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(
	(props: ArticleImageBlockComponentProps) => {
		const { block, className } = props;
		const { t } = useTranslation();

		return (
			<div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
				<img src={block.src} alt={block.title} className={classes.img} />
				{block.title && <Text title={block.title} align={TextAlign.CENTER} />}
			</div>
		);
	}
);
