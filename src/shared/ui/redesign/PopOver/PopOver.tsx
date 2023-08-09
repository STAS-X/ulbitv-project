import { FC, memo, ReactNode, useCallback, useRef, ReactElement, isValidElement, cloneElement } from 'react';
import { Popover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './PopOver.module.scss';
import { useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { VStack } from '../../redesign/Stack';
import { directionsToInlineStyle } from '@/shared/lib/helpers/directionsToInlineStyle';
import { DropDownDirectionType } from '@/shared/types/dropdown/directions';

export interface PopOverSize {
	maxWidth?: string | number;
	minWidth?: string | number;
	maxHeight?: string | number;
	minHeight?: string | number;
}

export interface PopOverItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

export interface PopOverProps {
	className?: string;
	direction?: DropDownDirectionType;
	size?: PopOverSize;
	isLoading?: boolean;
	items: PopOverItem[];
	trigger: ReactNode;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const PopOver: FC<PopOverProps> = memo((props: PopOverProps) => {
	const { className, items, direction, isLoading = false, size = {}, trigger } = props;

	const navigate = useNavigate();
	const triggerRef = useRef<HTMLButtonElement>(null);

	const handlePopoverClick = useCallback(
		(href?: string, onClick?: () => void) => {
			if (onClick) onClick();
			if (href) navigate(href);
			if (triggerRef?.current) triggerRef.current.click();
		},
		[triggerRef, navigate]
	);

	const inlineStyle = directionsToInlineStyle(direction);

	return (
		<Popover as={'div'} className={classNames(classes.PopOver, {}, [className])}>
			<Popover.Button as={'div'} ref={triggerRef} className={classes.trigger}>
				{trigger}
			</Popover.Button>
			<Popover.Panel className={classes.panel} style={{ ...inlineStyle, ...size }}>
				<VStack align={'center'} max>
					{items.map((item, index) => {
						const panelItemWithClass = isValidElement(item.content)
							? cloneElement(item.content as ReactElement, {
									className: classNames(
										'',
										{ [classes.disabled]: item.disabled || false, [classes.selected]: !isLoading },
										[]
									)
							  })
							: item.content;
						return (
							<li
								className={classes.panelitem}
								key={index}
								onClick={() => {
									if (!item.disabled) {
										handlePopoverClick(item.href, item.onClick);
									}
								}}
							>
								{panelItemWithClass}
							</li>
						);
					})}
				</VStack>
			</Popover.Panel>
		</Popover>
	);
});
