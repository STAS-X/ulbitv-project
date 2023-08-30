import { ArticleCodeBlock } from '../../model/types/articleSchema';
import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code/Code';
import { Code as CodeRedesign } from '@/shared/ui/redesign/Code/Code';
import classes from './ArticleCodeBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
	children?: ReactNode;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = memo(
	(props: ArticleCodeBlockComponentProps) => {
		const { block, className } = props;

		return (
			<div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<CodeRedesign>{block.code}</CodeRedesign>}
					off={<CodeDeprecated>{block.code}</CodeDeprecated>}
				/>
			</div>
		);
	}
);
