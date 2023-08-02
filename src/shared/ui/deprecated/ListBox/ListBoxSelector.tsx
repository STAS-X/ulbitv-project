import { FC, ReactNode, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ListBoxSelector.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Listbox } from '@headlessui/react';
import { HStack } from '../Stack';
import { directionsToInlineStyle } from '@/shared/lib/helpers/directionsToInlineStyle';
import { DropDownDirectionType } from '@/shared/types/dropdown/directions';

type ListBoxSelectorItem = {
	id: number;
	value: string;
	content: ReactNode;
	disabled?: boolean;
};

export interface ListBoxSelectorProps {
	items?: ListBoxSelectorItem[];
	className?: string;
	children?: ReactNode;
	dataTestId?: string;
	value?: string;
	defaultValue?: string;
	placeholder: string;
	readonly?: boolean;
	direction?: DropDownDirectionType;
	onChange?: <T extends string>(value: T) => void;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const ListBoxSelector: FC<ListBoxSelectorProps> = (props: ListBoxSelectorProps) => {
	const {
		className,
		items,
		defaultValue,
		placeholder,
		direction,
		readonly,
		value,
		dataTestId = 'ListBox',
		onChange
	} = props;

	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const handleChange = <T extends string>(value: T) => {
		setSelectedValue(value);
		if (onChange) onChange(value);
	};

	const inlineStyle = directionsToInlineStyle(direction);

	return (
		<Listbox
			data-testid={`${dataTestId}.ListBox`}
			as={'div'}
			className={classNames(classes.ListBox, {}, [className])}
			value={selectedValue}
			disabled={readonly}
			onChange={handleChange}
		>
			{placeholder && <Listbox.Label className={classes.label}>{placeholder}</Listbox.Label>}
			<Listbox.Button data-testid={`${dataTestId}.Trigger`} className={classes.trigger}>
				{({ open }) => (
					<HStack dataTestId={`${dataTestId}.Value`} justify={'between'} max>
						{value ?? defaultValue}
						{open ? '	▼' : '	▲'}
					</HStack>
				)}
			</Listbox.Button>
			<Listbox.Options
				data-testid={`${dataTestId}.Options`}
				className={classes.options}
				style={{ ...inlineStyle }}
			>
				{items?.map((item) => (
					<Listbox.Option
						className={classes.listitem}
						key={item.id}
						as={'div'}
						value={item.value}
						disabled={item.disabled}
					>
						{({ active, selected }) => (
							<li
								className={classNames(
									'',
									{ [classes.active]: active, [classes.selected]: selected },
									[]
								)}
							>
								{item.content}
							</li>
						)}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
