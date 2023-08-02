import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeGrid as Grid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { ArticleSchema } from '../../model/types/articleSchema';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleInfiniteLoader.module.scss';
import {
	LIST_ARTICLE_HEIGHT,
	TILE_ARTICLE_HEIGTH,
	LIST_SCELETON_HEIGTH,
	TILE_ARTICLE_WIDTH
} from '@/shared/const/localstorage';
import { useSelector } from 'react-redux';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	fetchNextArticlesPage,
	getArticlesPage,
	getArticlesPageCategory,
	getArticlesPageFilter,
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageNumber,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageTarget,
	getArticlesPageView
} from '@/pages/ArticlesPage';
import { useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { StateSchema, useAppDispatch } from '@/app/providers/StoreProvider';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getRouteArticleDetailes } from '@/shared/config/routeConfig';

export interface ArticleInfiniteGridLoaderProps {
	className?: string;
	children?: ReactNode;
	//inited: boolean;
	// view: ArticleView;
	// hasNextPage: boolean;
	// isNextPageLoading: boolean;
	// items?: ArticleSchema[];
	// limit: number;
	// emptyPlaceholder: JSX.Element | null;
	// fetchMore: () => Promise<void> | void;
}

interface InfiniteScrollGridWrapperProps {
	className?: string;
	isItemLoaded: (index: number) => boolean;
	itemCount: number;
	loadMoreItems: (start: number, stop: number) => void;
	items: Array<unknown>;
	view: ArticleView;
	threshold?: number;
	isLoading: boolean;
	columnCount: number;
	rowCount: number;
	width: number;
	height: number;
	columnWidth: (index: number) => number;
	rowHeight: (index: number) => number;
}

const InfiniteScrollGridWrapper: FC<InfiniteScrollGridWrapperProps> = memo((props: InfiniteScrollGridWrapperProps) => {
	const {
		className = '',
		isItemLoaded,
		itemCount,
		loadMoreItems,
		items,
		view,
		isLoading,
		threshold = 5,
		columnCount,
		rowCount,
		columnWidth,
		rowHeight,
		width,
		height
	} = props;

	// We create a reference for the InfiniteLoader
	const infiniteLoaderRef = useRef<InfiniteLoader | null>(null);
	const hasMountedRef = useRef(false);
	const gridRef = useRef<Grid | null>(null);

	const sortField = useSelector(getArticlesPageSortField);
	const sortOrder = useSelector(getArticlesPageSortOrder);
	const filter = useSelector(getArticlesPageFilter);
	const category = useSelector(getArticlesPageCategory);
	const target = useSelector(getArticlesPageTarget);

	const navigate = useNavigate();

	// Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
	useEffect(() => {
		// We only need to reset cached items when "view" changes.
		// This effect will run on mount too; there's no need to reset in that case.
		if (hasMountedRef.current) {
			if (infiniteLoaderRef?.current) {
				infiniteLoaderRef.current.resetloadMoreItemsCache();
			}
		}
		hasMountedRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortField, sortOrder, filter, category]);

	// Each time the sort prop changed we called the method resetSize of list items
	useEffect(() => {
		if (hasMountedRef.current) {
			if (gridRef?.current) {
				gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
				gridRef.current.scrollTo({ scrollTop: 0 });
			}
		}
		hasMountedRef.current = true;
	}, [view]);

	useEffect(() => {
		if (hasMountedRef.current) {
			if (gridRef?.current) {
				gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
			}
		}
		hasMountedRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	const onOpenArticle = useCallback(
		(articleId: number) => {
			if (target) {
				window.open(getRouteArticleDetailes(`${articleId}`), target);
			} else {
				if (articleId) navigate(getRouteArticleDetailes(`${articleId}`));
			}
		},
		[navigate, target]
	);

	const GridItems = memo(({ columnIndex, rowIndex, data, style }: any) => {
		const { list, columnCount, columnWidth } = data;
		const newStyle = {
			...style,
			padding: 10,
			gap: 10,
			...(view === ArticleView.LIST ? { width: columnWidth(columnIndex) } : {})
		};
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		const itemIndex = Number(rowIndex * columnCount + columnIndex);
		const item = list[itemIndex];

		return isItemLoaded(itemIndex) ? (
			item ? (
				<div style={{ ...newStyle }}>
					<ArticleListItem article={item as ArticleSchema} view={view} navigateTo={onOpenArticle} />
				</div>
			) : null
		) : (
			<div style={{ ...newStyle }}>
				<ArticleListItemSkeleton view={view} />
			</div>
		);
	}, areEqual);

	return (
		<InfiniteLoader
			ref={infiniteLoaderRef}
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
			threshold={threshold}
		>
			{({ onItemsRendered, style, ref }: any) => {
				const newItemsRendered = (gridData: any) => {
					const useOverscanForLoading = true;
					const {
						visibleRowStartIndex,
						visibleRowStopIndex,
						visibleColumnStartIndex,
						visibleColumnStopIndex,
						overscanRowStartIndex,
						overscanRowStopIndex,
						overscanColumnStartIndex,
						overscanColumnStopIndex
					} = gridData;

					const startCol = Number(useOverscanForLoading ? overscanColumnStartIndex : visibleColumnStartIndex);
					const endCol = Number(useOverscanForLoading ? overscanColumnStopIndex : visibleColumnStopIndex);

					const startRow = Number(useOverscanForLoading ? overscanRowStartIndex : visibleRowStartIndex);
					const endRow = Number(useOverscanForLoading ? overscanRowStopIndex : visibleRowStopIndex);

					//const visibleStartIndex = visibleRowStartIndex * (+visibleColumnStopIndex + 1); // (startRow - 1) * columnCount + 1;
					//const visibleStopIndex = visibleRowStartIndex * (+visibleColumnStopIndex + 1); // endRow * columnCount + 1;
					//const startIndex = startRow * columnCount + startCol;
					//const stopIndex = endRow * columnCount + endCol;
					const startIndexForLoadMore = (endRow + 1) * (endCol + 1);
					const endIndexForLoadMore = startIndexForLoadMore + threshold - 1;

					// Запускаем функцию подгрузки статей по мере необходимости
					loadMoreItems(startIndexForLoadMore, endIndexForLoadMore);

					// onItemsRendered({
					// 	//call onItemsRendered from InfiniteLoader so it can load more if needed
					// 	visibleStartIndex,
					// 	visibleStopIndex
					// });
				};

				return (
					<Grid
						className={classNames(classes.grid, {}, [className])}
						width={width}
						height={height - 20}
						style={{ ...style, overflowX: 'hidden' }}
						columnWidth={columnWidth}
						columnCount={columnCount}
						itemData={{ list: items, columnCount, columnWidth }}
						ref={(gridClass) => {
							gridRef.current = gridClass;
							hasMountedRef.current = true;
							ref(gridClass);
						}}
						onItemsRendered={newItemsRendered}
						rowCount={rowCount}
						rowHeight={rowHeight}
					>
						{GridItems}
					</Grid>
				);
			}}
		</InfiniteLoader>
	);
});

export const ArticleInfiniteGridLoader: FC<ArticleInfiniteGridLoaderProps> = memo(
	(props: ArticleInfiniteGridLoaderProps) => {
		const {
			className = ''
			// 	// Are there more items to load?
			// 	// (This information comes from the most recent API request.)
			// 	hasNextPage,

			// 	// Are we currently loading a page of items?
			// 	// (This may be an in-flight flag in your Redux store for example.)
			// 	isNextPageLoading,

			// 	// Array of items loaded so far.
			// 	items = [],

			// 	// Callback function responsible for loading the next page of items.
			// 	fetchMore,

			// 	// Limit items to load on some page or count of sceletons when loading
			// 	limit,

			// 	// Init load items when component onMount
			// 	//inited = false,

			// 	// Type view of ArticeList: LIST or TILE
			// 	view,

			// 	// Warning, if something wrong
			// 	emptyPlaceholder = null
		} = props;

		const dispatch = useAppDispatch();
		const isNextPageLoading = useSelector(getArticlesPageIsLoading);
		const hasNextPage = useSelector(getArticlesPageHasMore);
		const view = useSelector(getArticlesPageView);
		const page = useSelector(getArticlesPageNumber);
		const limit = useSelector(getArticlesPageLimit);
		const items = useSelector<StateSchema, ArticleSchema[]>(getArticlesPage.selectAll);

		const filter = useSelector(getArticlesPageFilter);
		const category = useSelector(getArticlesPageCategory);

		const { t } = useTranslation(['articles']);

		const hasFilter = !!filter || category.length > 0;
		let emptyPlaceholder: JSX.Element | null = null;

		if (!hasNextPage && !hasFilter) {
			emptyPlaceholder = <Text size={TextSize.L} content={t('noArticles')} />;
		} else {
			emptyPlaceholder =
				hasNextPage || isNextPageLoading ? null : (
					<Text
						size={TextSize.L}
						content={t('noFiltredArticles', {
							filter,
							category: Array.isArray(category) ? category.join(', ') : 'ALL'
						})}
					/>
				);
		}

		// Подгрузка новых статей после завершения скрола текущей ленты
		const fetchMore = useCallback(async () => {
			//console.log(inited, isLoading, hasMore, 'get data from store');
			if (_PROJECT_ !== 'storybook' && !isNextPageLoading && hasNextPage) await dispatch(fetchNextArticlesPage());
		}, [dispatch, isNextPageLoading, hasNextPage]);

		useEffect(() => {
			if (items.length === 0) void fetchMore();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [items]);

		const handleNextPage = useCallback(
			// Only load 1 page of items at a time.
			// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
			(startIndex: number, stopIndex: number) => {
				//console.log(startIndex, stopIndex, isNextPageLoading, 'scrolling to next PAGE');
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				!isNextPageLoading && startIndex > items.length - 1 ? void fetchMore() : () => {};
			},

			[isNextPageLoading, items, fetchMore]
		);

		const itemCount = useMemo(
			() => (hasNextPage ? items.length + limit : items.length),
			[hasNextPage, limit, items]
		);

		const columnCount = useCallback(
			(width: number) => (view === ArticleView.LIST ? 1 : Math.floor(width / (TILE_ARTICLE_WIDTH + 10))),
			[view]
		);
		const rowCount = useCallback(
			(heigth: number) => (view === ArticleView.LIST ? itemCount : Math.ceil(itemCount / columnCount(heigth))),
			[itemCount, columnCount, view]
		);

		// Every row is loaded except for our loading indicator row.
		const isItemLoaded = useCallback(
			(index: number) => {
				return !hasNextPage || index < items.length;
			},
			[hasNextPage, items]
		);

		// const infiniteItems = useMemo(
		// 	() => (page > 0 || !hasNextPage ? items : Array.from({ length: limit }, (_, i) => i)),
		// 	[items, limit, hasNextPage, page]
		// );

		const columnWidth = useCallback(
			(width: number) => (column: number) => view === ArticleView.LIST ? width - 30 : TILE_ARTICLE_WIDTH + 10,
			[view]
		);

		const rowHeight = useCallback(
			(row: number) =>
				view === ArticleView.LIST
					? isItemLoaded(row)
						? LIST_ARTICLE_HEIGHT + 10
						: LIST_SCELETON_HEIGTH + 10
					: TILE_ARTICLE_HEIGTH + 10,
			[view, isItemLoaded]
		);

		//console.log(infiniteItems, 'items to infinite list');

		return items.length > 0 ? (
			<AutoSizer>
				{({ width = 0, height = 0 }) => {
					return (
						<InfiniteScrollGridWrapper
							className={className}
							isItemLoaded={isItemLoaded}
							itemCount={itemCount}
							loadMoreItems={handleNextPage}
							items={[...items]}
							threshold={limit}
							columnWidth={columnWidth(width)}
							rowHeight={rowHeight}
							columnCount={columnCount(width)}
							rowCount={rowCount(width)}
							isLoading={isNextPageLoading}
							width={width}
							height={height}
							view={view}
						/>
					);
				}}
			</AutoSizer>
		) : (
			emptyPlaceholder
		);
	}
);
