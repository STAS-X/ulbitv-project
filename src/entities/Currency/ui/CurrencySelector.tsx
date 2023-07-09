import { FC, memo, ReactNode, useMemo } from 'react';
import { DropDownDirectionType } from '@/shared/types/dropdown/directions';
import { ListBoxSelector } from '@/shared/ui/ListBox/ListBoxSelector';
import { Currency } from '../model/types/currency';

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

	return (
		<ListBoxSelector
			dataTestId={dataTestId}
			className={className}
			items={options}
			readonly={readonly}
			direction={direction}
			value={value}
			defaultValue={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
});
