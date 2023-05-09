// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteLoader from 'react-window-infinite-loader';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VariableSizeGrid as Grid, areEqual } from 'react-window';
// eslint-disable-next-line import/no-extraneous-dependencies
import AutoSizer from 'react-virtualized-auto-sizer';
import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { ArticleSchema, ArticleView } from '../../model/types/articleSchema';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleInfiniteLoader.module.scss';
import {
	LIST_ARTICLE_HEIGHT,
	TILE_ARTICLE_HEIGTH,
	LIST_SCELETON_HEIGTH,
	TILE_ARTICLE_WIDTH
} from 'shared/const/localstorage';
import { useSelector } from 'react-redux';
import {
	getArticlesPageCategory,
	getArticlesPageFilter,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageTarget
} from 'pages/ArticlesPage';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';

export interface ArticleInfiniteGridLoaderProps {
	className?: string;
	//inited: boolean;
	view: ArticleView;
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items?: ArticleSchema[];
	limit: number;
	fetchMore: () => Promise<void> | void;
}

interface InfiniteScrollGridWrapperProps {
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
				window.open(`/${AppRoutes.ARTICLES}/${articleId}`, target);
			} else {
				if (articleId) navigate(`/${AppRoutes.ARTICLES}/${articleId}`);
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

					const visibleStartIndex = startRow * (endCol + 1); // (startRow - 1) * columnCount + 1;
					const visibleStopIndex = endRow * (endCol + 1); // endRow * columnCount + 1;
					const startIndex = startRow * columnCount + startCol;
					const stopIndex = endRow * columnCount + endCol;

					onItemsRendered({
						//call onItemsRendered from InfiniteLoader so it can load more if needed
						visibleStartIndex: startIndex,
						visibleStopIndex: stopIndex
					});
				};

				return (
					<Grid
						className={classes.grid}
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
			// Are there more items to load?
			// (This information comes from the most recent API request.)
			hasNextPage,

			// Are we currently loading a page of items?
			// (This may be an in-flight flag in your Redux store for example.)
			isNextPageLoading,

			// Array of items loaded so far.
			items = [],

			// Callback function responsible for loading the next page of items.
			fetchMore,

			// Limit items to load on some page or count of sceletons when loading
			limit,

			// Init load items when component onMount
			//inited = false,

			// Type view of ArticeList: LIST or TILE
			view
		} = props;

		//const items = useSelector<StateSchema, ArticleSchema[]>(getArticlesPage.selectAll);

		useEffect(() => {
			if (items.length === 0) fetchMore();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [items]);

		const handleNextPage = useCallback(
			// Only load 1 page of items at a time.
			// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
			(startIndex?: number, stopIndex?: number) => void fetchMore(),

			[fetchMore]
		);

		// useEffect(() => {
		// 	const initFetchData = () => {
		// 		if (!inited && hasNextPage && items.length === 0) fetchMore();
		// 	};
		// 	void initFetchData();
		// }, [inited, items, hasNextPage, fetchMore]);

		const itemCount = useMemo(() => (hasNextPage ? items.length + limit : items.length), [hasNextPage, limit, items]);

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

		return (
			<AutoSizer>
				{({ width = 0, height = 0 }) => {
					return (
						<InfiniteScrollGridWrapper
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
		);
	}
);
