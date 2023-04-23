import { FC, SelectHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Select.module.scss';

type HTMLSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>;

export type OptionType = {
	value: string;
	description: string;
};

export interface SelectProps extends HTMLSelectProps {
	className?: string;
	readonly?: boolean;
	placeholder?: string;
	value?: string;
	options?: OptionType[];
	onChange?: (value: string) => void;
}

export const Select: FC<SelectProps> = (props) => {
	const { placeholder, onChange, options, value, readonly = true, className, ...otherProps } = props;
	//console.log(`init select value is ${value || ''}`);
	const { t } = useTranslation();

	const onChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {
			target: { value }
		} = event;
		//event.target.options[0].
		onChange?.(value);
		console.log(`current value is ${value}`);
	};

	const mods: Mods = {
		[classes.readonly]: readonly
	};
	return (
		<div className={classNames(classes.wrapper, {}, [className])}>
			{placeholder && <span className={classes.placeholder}>{`${t(placeholder)}>`}</span>}
			<select
				onChange={onChangeValue}
				value={value}
				disabled={readonly}
				className={classNames(classes.select, mods)}
				{...otherProps}
			>
				{options?.map((option) => (
					<option
						selected={Boolean(option.value === value)}
						className={classes.option}
						value={option.value}
						key={option.value}
					>
						{option.description}
					</option>
				))}
			</select>
		</div>
	);
};
