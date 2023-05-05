// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteLoader from 'react-window-infinite-loader';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VariableSizeGrid as Grid } from 'react-window';
// eslint-disable-next-line import/no-extraneous-dependencies
import AutoSizer from 'react-virtualized-auto-sizer';
import { FC, useCallback, useEffect, useRef } from 'react';
import { ArticleSchema, ArticleView } from '../../model/types/articleSchema';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from 'ArticleInfiniteLoader.module.scss';

export interface ArticleInfiniteGridLoaderProps {
	className?: string;
	inited: boolean;
	view: ArticleView;
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: ArticleSchema[];
	limit: number;
	fetchMore: () => Promise<void> | void;
}

const LIST_ARTICLE_HEIGHT = 670;
const TILE_ARTICLE_WIDTH = 240;
const TILE_ARTICLE_HEIGTH = 290;

export const ArticleInfiniteGridLoader: FC<ArticleInfiniteGridLoaderProps> = (
	props: ArticleInfiniteGridLoaderProps
) => {
	const {
		// Are there more items to load?
		// (This information comes from the most recent API request.)
		hasNextPage,

		// Are we currently loading a page of items?
		// (This may be an in-flight flag in your Redux store for example.)
		isNextPageLoading,

		// Array of items loaded so far.
		items,

		// Callback function responsible for loading the next page of items.
		fetchMore,

		limit,

		inited = false,

		view
	} = props;

	// We create a reference for the InfiniteLoader
	const infiniteLoaderRef = useRef<InfiniteLoader>(null);
	const hasMountedRef = useRef(false);

	// Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
	useEffect(() => {
		// We only need to reset cached items when "sortOrder" changes.
		// This effect will run on mount too; there's no need to reset in that case.
		if (hasMountedRef.current) {
			if (infiniteLoaderRef.current) {
				infiniteLoaderRef.current.resetloadMoreItemsCache();
			}
		}
		hasMountedRef.current = true;
	}, []);

	const handleNextPage = useCallback(
		// Only load 1 page of items at a time.
		// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
		(startIndex?: number, stopIndex?: number) => {
			isNextPageLoading
				? () => {
						return;
				  }
				: void fetchMore();
		},

		[isNextPageLoading, fetchMore]
	);

	useEffect(() => {
		const initFetchData = () => {
			if (inited && items.length === 0) fetchMore();
		};
		void initFetchData();
	}, [inited, items, fetchMore]);

	return (
		<AutoSizer>
			{({ width = 0, height = 0 }) => {
				const columnCount = view === ArticleView.LIST ? 1 : Math.floor(width / (TILE_ARTICLE_WIDTH + 10));
				const rowCount =
					view === ArticleView.LIST ? items.length : Math.floor(items.length / (width / (TILE_ARTICLE_WIDTH + 10)));

				// Every row is loaded except for our loading indicator row.

				const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

				return (
					<InfiniteLoader
						ref={infiniteLoaderRef}
						isItemLoaded={isItemLoaded}
						itemCount={hasNextPage || items.length === 0 ? 20 : items.length}
						loadMoreItems={handleNextPage}
						threshold={limit}
					>
						{({ onItemsRendered, ref }: any) => {
							const newItemsRendered = (gridData: any) => {
								const useOverscanForLoading = true;
								const {
									visibleRowStartIndex,
									visibleRowStopIndex,
									visibleColumnStopIndex,
									overscanRowStartIndex,
									overscanRowStopIndex,
									overscanColumnStopIndex
								} = gridData;

								const endCol = +(useOverscanForLoading || true ? overscanColumnStopIndex : visibleColumnStopIndex) + 1;

								const startRow = useOverscanForLoading || true ? overscanRowStartIndex : visibleRowStartIndex;
								const endRow = useOverscanForLoading || true ? overscanRowStopIndex : visibleRowStopIndex;

								const visibleStartIndex = startRow * endCol;
								const visibleStopIndex = endRow * endCol;

								onItemsRendered({
									//call onItemsRendered from InfiniteLoader so it can load more if needed
									visibleStartIndex,
									visibleStopIndex
								});
							};
							const columnWidth = (index: number) => (view === ArticleView.LIST ? width - 30 : TILE_ARTICLE_WIDTH + 10);
							const rowHeight = (index: number) =>
								view === ArticleView.LIST ? LIST_ARTICLE_HEIGHT + 10 : TILE_ARTICLE_HEIGTH + 10;

							return (
								<Grid
									width={width}
									height={height - 15}
									columnWidth={columnWidth}
									columnCount={columnCount}
									itemData={{ list: items, columnCount }}
									ref={ref}
									onItemsRendered={newItemsRendered}
									rowCount={rowCount}
									rowHeight={rowHeight}
								>
									{({ columnIndex, rowIndex, data, style }) => {
										const newStyle = { ...style, padding: 10, gap: 10 };
										const { list, columnCount } = data;
										const item = list[rowIndex * columnCount + columnIndex];
										return isItemLoaded(rowIndex * columnCount + columnIndex) ? (
											<div style={{ ...newStyle }}>
												<ArticleListItem article={item} view={view} />
											</div>
										) : isNextPageLoading ? (
											<div style={{ ...newStyle }}>
												<ArticleListItemSkeleton view={view} />
											</div>
										) : null;
									}}
								</Grid>
							);
						}}
					</InfiniteLoader>
				);
			}}
		</AutoSizer>
	);
};
