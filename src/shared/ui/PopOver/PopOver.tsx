import { FC, memo, ReactNode } from 'react';
import { Popover } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './PopOver.module.scss';
import { useNavigate } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { VStack } from '../Stack';
import { directionsToInlineStyle } from 'shared/lib/helpers/directionsToInlineStyle';
import { DropDownDirectionType } from 'shared/types/dropdown/directions';

export interface PopOverItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

export interface PopOverProps {
	className?: string;
	direction?: DropDownDirectionType;
	items: PopOverItem[];
	trigger: ReactNode;
}

export const PopOver: FC<PopOverProps> = memo((props: PopOverProps) => {
	const { className, items, direction, trigger } = props;

	const { t } = useTranslation();

	const navigate = useNavigate();

	const handlePopoverClick = (href?: string, onClick?: () => void) => {
		if (onClick) onClick();
		if (href) navigate(href);
	};

	const inlineStyle = directionsToInlineStyle(direction);

	return (
		<Popover as={'div'} className={classNames(classes.PopOver, {}, [className])}>
			<Popover.Button className={classes.button}>{trigger}</Popover.Button>
			<Popover.Panel className={classes.panel} style={{ ...inlineStyle }}>
				<VStack align={'center'}>
					{items.map((item, index) => (
						<li
							key={index}
							className={classNames(classes.panelitem, { [classes.disabled]: item.disabled || false }, [])}
							onClick={() => {
								if (!item.disabled) handlePopoverClick(item.href, item.onClick);
							}}
						>
							{item.content}
						</li>
					))}
				</VStack>
			</Popover.Panel>
		</Popover>
	);
});
