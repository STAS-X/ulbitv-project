import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, getArticlesPage, articlesPageActions } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/getArticlesPageData';
import { fetchArticlesList } from '../../model/services/fetchArticesList/fetchArticlesList';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';

export interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducerList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: FC<ArticlesPageProps> = memo((props: ArticlesPageProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);
	const articles = useSelector<StateSchema, ArticleSchema[]>(getArticlesPage.selectAll);

	useEffect(() => {
		const fetchArticlesPage = async () => {
			if (_PROJECT_ !== 'storybook') await dispatch(fetchArticlesList());
			dispatch(articlesPageActions.initState());
		};
		void fetchArticlesPage();
	}, [dispatch]);

	const handleChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.header}>
					<ArticleViewSelector view={view ?? ArticleView.LIST} onViewClick={handleChangeView} />
				</div>
				<div className={classes.articlelist}>
					<ArticleList view={view} isLoading={isLoading} articles={articles} />
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default ArticlesPage;
