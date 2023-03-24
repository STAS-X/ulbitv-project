import { FC, SelectHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Select.module.scss';

type HTMLSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>;

export interface SelectProps extends HTMLSelectProps {
	className?: string;
	readonly?: boolean;
	placeholder?: string;
	value?: string;
	options?: Array<string>;
	onChange?: (value: string) => void;
}

export const Select: FC<SelectProps> = (props) => {
	const { placeholder, onChange, options, value, readonly = true, className, ...otherProps } = props;

	const { t } = useTranslation();

	const onChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {
			target: { value }
		} = event;
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
				{options?.map((item) => (
					<option className={classes.option} key={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};
