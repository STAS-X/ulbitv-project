import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './ArticleDetailesPageHeader.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserCanEditArticle } from '../../model/selectors/getArticleEditable';
import { getArticleData } from '../../../../entities/Article';

export interface ArticleDetailesPageHeaderProps {
	className?: string;
}

export const ArticleDetailesPageHeader: FC<ArticleDetailesPageHeaderProps> = (
	props: ArticleDetailesPageHeaderProps
) => {
	const { className } = props;
	const { t } = useTranslation(['articles']);

	const isEditable = useSelector(getUserCanEditArticle);
	const articleId = String(useSelector(getArticleData)?.id) || '';

	const navigate = useNavigate();

	const navigateToList = useCallback(() => {
		navigate(`/${AppRoutes.ARTICLES}`);
	}, [navigate]);

	const navigateToEditArticle = useCallback(() => {
		navigate(`/${AppRoutes.ARTICLES}/${articleId}/edit`);
	}, [navigate, articleId]);

	return (
		<div className={classNames(classes.ArticleDetailesPageHeader, {}, [className])}>
			<Button theme={ButtonTheme.OUTLINE} onClick={navigateToList}>
				{t('backToList')}
			</Button>
			{isEditable && (
				<Button className={classes.editBtn} theme={ButtonTheme.OUTLINE} onClick={navigateToEditArticle}>
					{t('editArticle')}
				</Button>
			)}
		</div>
	);
};
