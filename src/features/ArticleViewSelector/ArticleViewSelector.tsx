import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from '../../entities/Article';
import classes from './ArticleViewSelector.module.scss';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TileIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

const viewTypes = [
	{ view: ArticleView.LIST, icon: ListIcon },
	{ view: ArticleView.TILE, icon: TileIcon }
];

export interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (newView: ArticleView) => void;
}

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = (props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const handleChangeView = (newView: ArticleView) => () => {
		if (onViewClick && newView !== view) onViewClick(newView);
	};

	return (
		<div className={classNames('', {}, [className])}>
			{viewTypes.map((viewItem) => (
				<Button
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
	);
};