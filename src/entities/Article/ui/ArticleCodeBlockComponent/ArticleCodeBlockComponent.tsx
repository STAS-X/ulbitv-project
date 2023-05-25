import { ArticleCodeBlock } from '../../model/types/articleSchema';
import { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code/Code';
import classes from './ArticleCodeBlockComponent.module.scss';

export interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
	children?: ReactNode;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = memo(
	(props: ArticleCodeBlockComponentProps) => {
		const { block, className } = props;
		const { t } = useTranslation();

		return (
			<div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
				<Code>{block.code}</Code>
			</div>
		);
	}
);
