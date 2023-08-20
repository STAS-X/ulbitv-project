import { FC, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleViewSelector.module.scss';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tiled-24-24.svg';
import ListIconRedesign from '@/shared/assets/icons/burger.svg';
import TileIconRedesign from '@/shared/assets/icons/tile.svg';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon as IconRedesign } from '@/shared/ui/redesign/Icon/Icon';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card as CardRedesign } from '@/shared/ui/redesign/Card/Card';
import { HStack as HStackRedesign } from '@/shared/ui/redesign/Stack';

const viewTypes = (isRedesign: boolean) => [
	{ view: ArticleView.LIST, icon: isRedesign ? ListIconRedesign : ListIcon },
	{ view: ArticleView.TILE, icon: isRedesign ? TileIconRedesign : TileIcon }
];

export interface ArticleViewSelectorProps {
	className?: string;
	children?: ReactNode;
	view: ArticleView;
	onViewClick?: (newView: ArticleView) => void;
}

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = (props: ArticleViewSelectorProps) => {
	const { className = '', view, onViewClick } = props;

	const handleChangeView = useCallback(
		(newView: ArticleView) => () => {
			if (onViewClick) onViewClick(newView);
		},
		[onViewClick]
	);

	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			on={
				<CardRedesign
					data-testid={'ArticleSortSelector'}
					border={'round'}
					className={classNames(classes.viewredesign)}
				>
					<HStackRedesign gap={8}>
						{viewTypes(true).map((viewItem) => (
							<IconRedesign
								dataTestId={`Button.${viewItem.view}`}
								key={viewItem.view}
								clickable
								onClick={handleChangeView(viewItem.view)}
								className={classNames(classes.selectorredesign, {
									[classes.selectedredesign]: viewItem.view === view
								})}
								Svg={viewItem.icon}
							></IconRedesign>
						))}
					</HStackRedesign>
				</CardRedesign>
			}
			off={
				<div data-testid={'ArticleSortSelector'} className={classNames(classes.view)}>
					{viewTypes(false).map((viewItem) => (
						<Button
							dataTestId={`Button.${viewItem.view}`}
							key={viewItem.view}
							theme={ButtonTheme.CLEAR}
							onClick={handleChangeView(viewItem.view)}
							className={classNames(classes.selector, {
								[classes.selected]: viewItem.view === view
							})}
						>
							<Icon Svg={viewItem.icon} />
						</Button>
					))}
				</div>
			}
		/>
	);
};
