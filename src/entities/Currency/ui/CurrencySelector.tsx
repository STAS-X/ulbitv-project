import { FC, memo, ReactNode, useMemo } from 'react';
import { DropDownDirectionType } from '@/shared/types/dropdown/directions';
import { ListBoxSelector } from '@/shared/ui/deprecated/ListBox/ListBoxSelector';
import { ListBoxSelector as ListBoxSelectorRedesign } from '@/shared/ui/redesign/ListBox/ListBoxSelector';
import { Currency } from '../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

interface CurrencySelectorProps {
	className?: string;
	readonly?: boolean;
	placeholder: string;
	direction?: DropDownDirectionType;
	dataTestId?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const CurrencySelector: FC<CurrencySelectorProps> = memo((props: CurrencySelectorProps) => {
	const { className, readonly, value, direction, placeholder, dataTestId = 'CurrencySelector', onChange } = props;

	const options = useMemo(() => {
		return Object.values(Currency).map((value, index) => {
			return { id: index, value, content: value as ReactNode };
		});
	}, []);

	const propsToComponent = {
		dataTestId,
		className,
		items: options,
		readonly,
		direction,
		value,
		defaultValue: value,
		placeholder,
		onChange: onChange
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<ListBoxSelector {...propsToComponent} />}
			on={<ListBoxSelectorRedesign {...propsToComponent} />}
		/>
	);
});
