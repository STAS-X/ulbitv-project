import { FC, memo, useMemo } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../Country';

interface CountrySelectorProps {
	className?: string;
	readonly?: boolean;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const CountrySelector: FC<CountrySelectorProps> = memo((props: CountrySelectorProps) => {
	const { className, readonly, value, placeholder, onChange } = props;

	const options = useMemo(() => {
		return Object.values(Country).map((value) => {
			return { value, description: value };
		});
	}, []);

	return (
		<Select
			className={className}
			options={options}
			readonly={readonly}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
});
