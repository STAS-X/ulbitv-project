import { useAppDispatch } from 'app/providers/StoreProvider';
import { getArticleData, getArticleError, getArticleIsLoading } from 'entities/Article';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { articleDetailsActions, articleDetailsReducer } from 'entities/Article/model/slices/articleSlice';
import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Loader } from 'shared/ui/Loader/Loader';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import classes from './ArticleDetailesPage.module.scss';

const redusers: ReducerList = {
	articleDetailes: articleDetailsReducer
};

export interface ArticleDetailesPageProps {
	className?: string;
}

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = memo((props: ArticleDetailesPageProps) => {
	const { className } = props;
	const { id: articleId = '1' } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { t } = useTranslation(['articles', 'errors']);

	const articleData = useSelector(getArticleData);
	const error = useSelector(getArticleError);
	const isLoading = true; //useSelector(getArticleIsLoading);

	const mods: Mods = {
		[classes.loading]: !!isLoading
	};

	useEffect(() => {
		if (!isNaN(parseInt(articleId))) {
			dispatch(fetchArticleById({ articleId: Number(articleId) }));
		} else dispatch(articleDetailsActions.setArticleError('articleNotFound'));
	}, [dispatch, articleId]);

	useEffect(() => {
		if (articleData) console.log(articleData, `get article ${articleData?.id} data`);
	}, [articleData]);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<div className={classNames(classes.articledetailespage, {}, [className])}>
				{error ? (
					<Text
						title={t('errorTitle', { ns: 'errors' })}
						content={t(error, { ns: 'errors', articleId })}
						theme={TextTheme.ERROR}
						align={TextAlign.CENTER}
					/>
				) : isLoading ? (
					<div className={classNames('', mods)}>
						<Skeleton className={classes.avatar} width={200} height={200} border={'50%'} />
						<Skeleton className={classes.title} width={300} height={60} />
						<Skeleton className={classes.skeleton} width={600} height={30} />
						<Skeleton className={classes.skeleton} width={'100%'} height={150} />
						<Skeleton className={classes.skeleton} width={'100%'} height={200} />
						<Skeleton className={classes.skeleton} width={'100%'} height={250} />
					</div>
				) : (
					<>
						<h3>ARTICLES DETAILES</h3>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyItems: 'flex-start', marginTop: 15 }}
						>
							<span>ID - {articleData?.id}</span>
							<span>Title - {articleData?.title}</span>
							<span>Subtitle - {articleData?.subtitle}</span>
						</div>
					</>
				)}
			</div>
		</DynamicModuleLoader>
	);
});

export default ArticleDetailesPage;
