import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserCanEditArticle } from '../../model/selectors/getArticleEditable';
import { getArticleData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/config/routeConfig/routeConfig';

export interface ArticleDetailesPageHeaderProps {
	className?: string;
	children?: ReactNode;
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
		navigate(getRouteArticles());
	}, [navigate]);

	const navigateToEditArticle = useCallback(() => {
		navigate(getRouteArticleEdit(`${articleId}`));
	}, [navigate, articleId]);

	return (
		<HStack className={classNames('', {}, [className])} justify={'between'} max>
			<Button theme={ButtonTheme.OUTLINE} onClick={navigateToList}>
				{t('backToList')}
			</Button>
			{isEditable && (
				<Button theme={ButtonTheme.OUTLINE} onClick={navigateToEditArticle}>
					{t('editArticle')}
				</Button>
			)}
		</HStack>
	);
};
