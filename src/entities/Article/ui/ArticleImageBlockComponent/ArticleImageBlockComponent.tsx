import { ArticleImageBlock } from '../../model/types/articleSchema';
import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

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
				{block.title && (
					<ToggleFeatures
						feature={'isAppRedesigned'}
						on={<TextRedesign title={block.title} align={'align-center'} />}
						off={<TextDeprecated title={block.title} align={TextAlign.CENTER} />}
					/>
				)}
			</div>
		);
	}
);
