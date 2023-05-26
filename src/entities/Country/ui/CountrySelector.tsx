import { FC, memo, ReactNode, useMemo } from 'react';
import { DropDownDirectionType } from 'shared/types/dropdown/directions';
import { ListBoxSelector } from 'shared/ui/ListBox/ListBoxSelector';
import { Country } from '../model/types/country';

interface CountrySelectorProps {
	className?: string;
	readonly?: boolean;
	placeholder: string;
	direction?: DropDownDirectionType;
	value?: string;
	onChange?: (value: string) => void;
}

export const CountrySelector: FC<CountrySelectorProps> = memo((props: CountrySelectorProps) => {
	const { className, readonly, value, direction, placeholder, onChange } = props;

	const options = useMemo(() => {
		return Object.values(Country).map((value, index) => {
			return { id: index, value, content: value as ReactNode };
		});
	}, []);

	return (
		<ListBoxSelector
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
