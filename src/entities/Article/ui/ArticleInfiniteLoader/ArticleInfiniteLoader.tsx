/* eslint-disable import/no-extraneous-dependencies */
import { CSSProperties, FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { ArticleSchema } from '../../model/types/articleSchema';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import classes from './ArticleInfiniteLoader.module.scss';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

export interface ArticleInfiniteLoaderProps {
	className?: string;
	inited: boolean;
	view: ArticleView;
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: ArticleSchema[];
	sortField: string;
	sortOrder: string;
	filter: string;
	category: string[];
	limit: number;
	loadNextPage: () => void;
}

interface ItemRendererProps {
	index: number;
	style: CSSProperties;
}

const LIST_ARTICLE_HEIGHT = 680;

export const ArticleInfiniteLoader: FC<ArticleInfiniteLoaderProps> = (props: ArticleInfiniteLoaderProps) => {
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
		loadNextPage,

		sortField,
		sortOrder,
		filter = '',
		category = [],
		limit,
		inited = false,
		view
	} = props;

	// We create a reference for the InfiniteLoader
	const infiniteLoaderRef = useRef<InfiniteLoader>(null);
	const hasMountedRef = useRef(false);

	const listScrollWrapper = useRef<HTMLDivElement>(null);
	const listScrollHeigth = useRef(LIST_ARTICLE_HEIGHT);

	// Добавление функции слежения за скролом на div infiniteLoaderContainer
	const onScrollToTop = useCallback(() => {
		//console.log(pageWrapper, `scroll to TOP! ${scrollTo} ${String(isLoading)}`);
		if (listScrollWrapper?.current) {
			const listScroll = listScrollWrapper.current.firstElementChild as HTMLDivElement;
			if (listScroll.scrollTop > 0) listScroll.scrollTop = 0;
		}
	}, [listScrollWrapper]);

	// Set full heigth to list infinite and fix heigth of list items
	useEffect(() => {
		if (inited && listScrollWrapper?.current) {
			const listScrollParent = listScrollWrapper?.current.parentElement as HTMLDivElement;
			listScrollHeigth.current = listScrollParent.clientHeight;
			// if (items.length > 0) {
			// 	const listScrollFixed = listScrollWrapper?.current.firstElementChild?.firstElementChild as HTMLDivElement;
			// 	if (listScrollFixed) {
			// 		const itemDivs = Array.from(listScrollFixed.querySelectorAll(':scope > div'));
			// 		console.log(itemDivs, 'get paretn of scroll items');
			// 		if (itemDivs.length > 0) {
			// 			let currentTop = 0;
			// 			itemDivs.forEach((item) => {
			// 				const div = item as HTMLDivElement;
			// 				div.style.top = `${currentTop}px`;
			// 				if (div.firstElementChild) {
			// 					const itemStyle = window.getComputedStyle(div.firstElementChild);
			// 					const margins = parseFloat(itemStyle.marginTop) + parseFloat(itemStyle.marginBottom);
			// 					currentTop += Math.ceil((div.firstElementChild as HTMLDivElement).offsetHeight + margins);
			// 					div.style.height = `${currentTop}px`;
			// 					div.style.left = `10`;
			// 				}
			// 			});
			// 		}
			// 	}
			// }
			console.log(listScrollWrapper.current.clientHeight, 'get style data of listscroll');
		}
	}, [inited, listScrollWrapper, items]);

	// Set heigth value to list infinite scroll
	useEffect(() => {
		if (listScrollWrapper?.current) {
			listScrollHeigth.current = listScrollWrapper.current.clientHeight;
		}
	}, [listScrollHeigth, listScrollWrapper]);

	// Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
	useEffect(() => {
		// We only need to reset cached items when "sortOrder" changes.
		// This effect will run on mount too; there's no need to reset in that case.
		if (hasMountedRef.current) {
			if (infiniteLoaderRef.current) {
				infiniteLoaderRef.current.resetloadMoreItemsCache();
				onScrollToTop();
			}
		}
		hasMountedRef.current = true;
	}, [sortField, filter, category, sortOrder, onScrollToTop]);

	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = useMemo(() => (hasNextPage ? items.length + limit : items.length), [items, limit, hasNextPage]);

	useEffect(() => {
		if (inited && items.length === 0) loadNextPage();
	}, [inited, items, loadNextPage]);

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	// eslint-disable-next-line @typescript-eslint/no-empty-function, react-hooks/exhaustive-deps
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

	// Every row is loaded except for our loading indicator row.

	const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

	// Render an item or a loading indicator.
	const Item: FC<ItemRendererProps> = ({ index, style }) => {
		const itemWrapper = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (itemWrapper?.current && itemWrapper.current.firstElementChild) {
				console.log(
					itemWrapper.current,
					(itemWrapper.current.firstElementChild as HTMLDivElement).offsetHeight,
					'get item height'
				);
				itemWrapper.current.style.height = `${
					(itemWrapper.current.firstElementChild as HTMLDivElement).offsetHeight
				}px`;
			}
		}, [itemWrapper]);

		const newStyle: CSSProperties = {
			...style,
			height: 'fit-content',
			paddingRight: 30,
			paddingLeft: 10,
			paddingTop: 5,
			paddingBottom: 5
		};
		let content;
		if (!isItemLoaded(index)) {
			content = <ArticleListItemSkeleton view={view} />;
		} else {
			content = <ArticleListItem article={items[index]} view={view} />;
		}

		return (
			<div ref={itemWrapper} style={newStyle}>
				{content}
			</div>
		);
	};

	const handleNextPage = useCallback(
		(start?: number, stop?: number) => {
			loadMoreItems();
		},
		[loadMoreItems]
	);

	return (
		<div ref={listScrollWrapper} className={classes.ArticleInfiniteLoader}>
			<InfiniteLoader
				ref={infiniteLoaderRef}
				isItemLoaded={isItemLoaded}
				itemCount={itemCount}
				loadMoreItems={handleNextPage}
				threshold={limit}
			>
				{({ onItemsRendered, ref }) => {
					return (
						<List
							itemCount={itemCount}
							onItemsRendered={onItemsRendered}
							ref={ref}
							itemSize={LIST_ARTICLE_HEIGHT}
							height={listScrollHeigth.current}
							width={'100%'}
						>
							{Item}
						</List>
					);
				}}
			</InfiniteLoader>
		</div>
	);
};
