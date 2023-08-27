import { FC, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserCanEditArticle, getArticleData } from '@/entities/Article';
import { HStack } from '@/shared/ui/redesign/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/config/routeConfig';
import { AddNavigateButton } from '@/features/AddNavigateButton';
import { StateSchema } from '@/app/providers/StoreProvider';

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

	const navigateToEditArticle = useMemo(() => getRouteArticleEdit(`${articleId}`), [articleId]);

	return (
		<HStack className={classNames('', {}, [className])} justify={'between'} max>
			<AddNavigateButton navigateTo={getRouteArticles()} />
			{isEditable && <AddNavigateButton navigateTo={navigateToEditArticle} title={t('editArticle')} />}
		</HStack>
	);
};
