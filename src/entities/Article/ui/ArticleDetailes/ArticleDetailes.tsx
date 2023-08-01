import { useAppDispatch } from '@/app/providers/StoreProvider';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getArticleError, getArticleIsLoading, getArticleData } from '../../model/selectors/getArticleData';
import { articleDetailsReducer } from '../../model/slices/articleSlice';
import { FC, memo, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import classes from './ArticleDetailes.module.scss';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from '../../model/types/articleSchema';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { HStack, VStack } from '@/shared/ui/Stack';

const redusers: ReducerList = {
	articleDetailes: articleDetailsReducer
};

export interface ArticleDetailesProps {
	className?: string;
	articleId?: string;
	children?: ReactNode;
}

export const ArticleDetailes: FC<ArticleDetailesProps> = memo((props: ArticleDetailesProps) => {
	const { articleId = '', className } = props;
	const dispatch = useAppDispatch();
	const { t } = useTranslation(['articles', 'errors']);

	const error = useSelector(getArticleError);
	const isLoading = useSelector(getArticleIsLoading);
	const articleData = useSelector(getArticleData);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return <ArticleCodeBlockComponent key={block.id} className={classes.block} block={block} />;
			case ArticleBlockType.IMAGE:
				return <ArticleImageBlockComponent key={block.id} className={classes.block} block={block} />;
			case ArticleBlockType.TEXT:
				return <ArticleTextBlockComponent key={block.id} className={classes.block} block={block} />;
			default:
				return null;
		}
	}, []);

	const mods: Mods = {
		[classes.loading]: !!isLoading
	};

	useEffect(() => {
		const fetchArticle = async () => {
			if (_PROJECT_ !== 'storybook') await dispatch(fetchArticleById({ articleId }));
		};
		void fetchArticle();
	}, [dispatch, articleId]);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<VStack dataTestId={'ArticleDetailesData'} gap={16} className={classNames('', mods, [className])}>
				{error ? (
					<Text
						title={t('errorTitle', { ns: 'errors' })}
						content={t(error, { ns: 'errors', articleId })}
						theme={TextTheme.ERROR}
						align={TextAlign.CENTER}
					/>
				) : isLoading ? (
					<>
						<Skeleton className={classes.avatar} width={200} height={200}
border={'50%'} />
						<Skeleton className={classes.title} width={300} height={60} />
						<Skeleton className={classes.skeleton} width={600} height={30} />
						<Skeleton className={classes.skeleton} width={'100%'} height={150} />
						<Skeleton className={classes.skeleton} width={'100%'} height={120} />
						<Skeleton className={classes.skeleton} width={'100%'} height={160} />
					</>
				) : (
					articleData && (
						<>
							<HStack justify={'center'} max>
								<Avatar size={200} src={articleData.img} className={classes.avatar} />
							</HStack>
							<VStack gap={4}>
								<Text
									dataTestId={'Article.Title'}
									className={classes.title}
									title={articleData.title}
									content={articleData.subtitle}
									size={TextSize.L}
								/>
								<HStack gap={10} max className={classes.articleinfo}>
									<Icon Svg={EyeIcon} className={classes.icon} />
									<Text content={String(articleData.views)} />
								</HStack>
								<HStack gap={10} max className={classes.articleinfo}>
									<Icon Svg={CalendarIcon} className={classes.icon} />
									<Text content={articleData.createdAt} />
								</HStack>
							</VStack>
							{articleData.blocks?.map(renderBlock)}
						</>
					)
				)}
			</VStack>
		</DynamicModuleLoader>
	);
});
