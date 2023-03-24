import { FC, memo } from 'react';
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
	const { className, readonly, value, onChange } = props;

	return (
		<Select
			className={className}
			options={Object.values(Country)}
			readonly={readonly}
			value={value}
			onChange={onChange}
		/>
	);
});
