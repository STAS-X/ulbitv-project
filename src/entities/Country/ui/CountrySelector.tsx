import { FC, memo, ReactNode, useMemo } from 'react';
import { ListBoxSelector } from 'shared/ui/ListBox/ListBoxSelector';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../Country';

interface CountrySelectorProps {
	className?: string;
	readonly?: boolean;
	placeholder: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const CountrySelector: FC<CountrySelectorProps> = memo((props: CountrySelectorProps) => {
	const { className, readonly, value, placeholder, onChange } = props;

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
			value={value}
			defaultValue={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
});
