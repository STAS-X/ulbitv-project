import { FC, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './DropDown.module.scss';
import { useNavigate } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { VStack } from '../Stack';
import { directionsToInlineStyle } from 'shared/lib/helpers/directionsToInlineStyle';
import { DropDownDirectionType } from 'shared/types/dropdown/directions';

export interface DropDownItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

export interface DropDownProps {
	className?: string;
	direction?: DropDownDirectionType;
	items: DropDownItem[];
	trigger: ReactNode;
}

export const DropDown: FC<DropDownProps> = memo((props: DropDownProps) => {
	const { className, items, direction, trigger } = props;

	const navigate = useNavigate();

	const handleMenuClick = (href?: string, onClick?: () => void) => {
		if (onClick) onClick();
		if (href) navigate(href);
	};

	const inlineStyle = directionsToInlineStyle(direction);

	return (
		<Menu as={'div'} className={classNames(classes.DropDown, {}, [className])}>
			<Menu.Button className={classes.button}>{trigger}</Menu.Button>
			<Menu.Items className={classes.menu} style={{ ...inlineStyle }}>
				<VStack align={'center'}>
					{items.map((item, index) => (
						<Menu.Item key={index} as={'div'} disabled={item.disabled}>
							{({ active }) => (
								<li
									className={classNames(
										classes.menuitem,
										{ [classes.active]: active || false, [classes.disabled]: item.disabled || false },
										[]
									)}
									onClick={() => {
										if (!item.disabled) handleMenuClick(item.href, item.onClick);
									}}
								>
									{item.content}
								</li>
							)}
						</Menu.Item>
					))}
				</VStack>
			</Menu.Items>
		</Menu>
	);
});
