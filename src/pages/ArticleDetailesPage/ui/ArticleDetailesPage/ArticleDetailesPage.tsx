import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleDetailesPage.module.scss';

export interface ArticleDetailesPageProps {
	className?: string;
}

export const ArticleDetailesPage: FC<ArticleDetailesPageProps> = memo((props: ArticleDetailesPageProps) => {
	const { className } = props;
	const { t } = useTranslation('article');

	return <div className={classNames(classes.ArticleDetailesPage, {}, [className])}>ARTICLES DETAILES</div>;
});
