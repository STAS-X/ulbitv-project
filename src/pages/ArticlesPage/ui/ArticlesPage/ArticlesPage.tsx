import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticlesPage.module.scss';

export interface ArticlesPageProps {
	className?: string;
}

export const ArticlesPage: FC<ArticlesPageProps> = memo((props: ArticlesPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(classes.ArticlesPage, {}, [className])}>ARTICLES PAGE</div>;
});
