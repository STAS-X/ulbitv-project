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
import { Skeleton } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { Text } from '@/shared/ui/redesign/Text/Text';
import classes from './ArticleDetailes.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/articleSchema';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { ArticleDetailesDeprecated } from './ArticlesDetailesDeprecated/ArticleDetailesDeprecated';
import { Image } from '@/shared/ui/redesign/Image/Image';

const redusers: ReducerList = {
	articleDetailes: articleDetailsReducer
};

export interface ArticleDetailesProps {
	className?: string;
	articleId?: string;
	children?: ReactNode;
}

const ArticleDetailesRedesigned: FC<ArticleDetailesProps> = memo((props: ArticleDetailesProps) => {
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
						variant={'error'}
						align={'align-center'}
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
							<Text
								dataTestId={'Article.Title'}
								title={articleData.title}
								content={articleData.subtitle}
								size={'l'}
								bold
							/>
							<Image
								width={'100%'}
								height={420}
								src={articleData.img}
								border={16}
								className={classes.image}
							/>
							{articleData.blocks?.map(renderBlock)}
						</>
					)
				)}
			</VStack>
		</DynamicModuleLoader>
	);
});

export const ArticleDetailes = (props: ArticleDetailesProps) => {
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<ArticleDetailesRedesigned {...props} />}
			off={<ArticleDetailesDeprecated {...props} />}
		/>
	);
};
