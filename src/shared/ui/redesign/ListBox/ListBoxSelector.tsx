import { ReactElement, ReactNode, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ListBoxSelector.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Listbox } from '@headlessui/react';
import { directionsToInlineStyle } from '@/shared/lib/helpers/directionsToInlineStyle';
import { DropDownDirectionType } from '@/shared/types/dropdown/directions';
import { Button } from '../Button/Button';

export interface ListBoxSelectorItem<T extends string> {
	id: number;
	value: T;
	content: ReactNode;
	disabled?: boolean;
}

export interface ListBoxSelectorProps<T extends string> {
	items?: ListBoxSelectorItem<T>[];
	className?: string;
	children?: ReactNode;
	dataTestId?: string;
	value?: T;
	defaultValue?: T;
	placeholder: string;
	labelblock?: boolean;
	readonly?: boolean;
	direction?: DropDownDirectionType;
	onChange?: (value: T) => void;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const ListBoxSelector = <T extends string>(
	props: ListBoxSelectorProps<T>
): ReactElement<ListBoxSelectorProps<T>> => {
	const {
		className,
		items,
		defaultValue = '',
		placeholder,
		direction,
		readonly,
		labelblock = false,
		value,
		dataTestId = 'ListBox',
		onChange
	} = props;

	const convertValueToDescription = (value?: T) => {
		return (value ? items?.filter((item) => item.value === value)?.[0].content : defaultValue) as T;
	};

	const [selectedValue, setSelectedValue] = useState(value);
	const [selectedDescription, setSelectedDescription] = useState(convertValueToDescription(value));

	const handleChange = (value: T) => {
		setSelectedValue(value);
		setSelectedDescription(convertValueToDescription(value));
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
			{placeholder && (
				<Listbox.Label className={classNames(classes.label, { [classes.labelblock]: labelblock })}>
					{placeholder}
				</Listbox.Label>
			)}
			<Listbox.Button as={'div'} data-testid={`${dataTestId}.Trigger`} className={classes.trigger}>
				{({ open }) => (
					<Button dataTestId={`${dataTestId}.Value`} variant={'filled'}>
						{selectedDescription}
						{open ? '	▼' : '	▲'}
					</Button>
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
