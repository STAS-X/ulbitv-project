import { FC, memo, useMemo } from 'react';
import { UserData } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { Avatar } from '@/shared/ui/redesign/Avatar/Avatar';
import { Text } from '@/shared/ui/redesign/Text/Text';
import { useSelector } from 'react-redux';
import { getRouteArticleEdit } from '@/shared/config/routeConfig';
import { useTranslation } from 'react-i18next';
import { AddNavigateButton } from '@/features/AddNavigateButton';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { getUserCanEditArticle } from '@/entities/Article';

export interface ArticleAdditioonalInfoProps {
	className?: string;
	author: UserData;
	articleId: string | number;
	createdAt: string;
	views: number;
}

export const ArticleAdditionalInfo: FC<ArticleAdditioonalInfoProps> = memo((props: ArticleAdditioonalInfoProps) => {
	const { className, author, createdAt, views, articleId } = props;

	const { t } = useTranslation(['articles']);

	const isEditable = useSelector(getUserCanEditArticle);

	const navigateToEditArticle = useMemo(() => getRouteArticleEdit(`${articleId}`), [articleId]);

	return (
		<VStack className={className} gap={32}>
			<HStack gap={8}>
				<Avatar src={author.avatar} size={32} />
				<Text content={author.username} bold />
				<Text content={createdAt} />
			</HStack>
			{isEditable && <AddNavigateButton navigateTo={navigateToEditArticle} title={t('editArticle')} />}
			<Text content={t('views', { keyPrefix: 'plurals', count: views })} />
		</VStack>
	);
});
