import { FC, memo } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../Currency';

interface CurrencySelectorProps {
	className?: string;
	readonly?: boolean;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const CurrencySelector: FC<CurrencySelectorProps> = memo((props: CurrencySelectorProps) => {
	const { className, readonly, value, placeholder, onChange } = props;

	return (
		<Select
			className={className}
			options={Object.values(Currency)}
			readonly={readonly}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
});
