import { FC, ForwardedRef, forwardRef, InputHTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '../Text/Text';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'readOnly' | 'onChange'>;

export interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	type?: string;
	placeholder?: string;
	validation?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

const InputRef = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		placeholder = 'userName',
		type = 'text',
		readonly = false,
		value = '',
		validation = '',
		onChange,
		...otherProps
	} = props;
	const { t } = useTranslation();

	const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
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
		<div className={classNames(classes.inputwrapper, {}, [className])}>
			{validation && (
				<div className={classes.validation}>
					<Text content={validation} theme={TextTheme.ERROR} align={TextAlign.LEFT} />
				</div>
			)}
			{placeholder && <span className={classes.placeholder}>{`${t(placeholder)}>`}</span>}
			<div className={classes.caretwrapper}>
				<input
					ref={ref || undefined}
					className={classNames(classes.input, mods)}
					value={value}
					type={type}
					onChange={onChangeValue}
					readOnly={readonly}
					{...otherProps}
				></input>
				<span className={classes.caret}></span>
			</div>
		</div>
	);
};

export const Input = memo(forwardRef<HTMLInputElement, InputProps>(InputRef));

// Input.propTypes = {
// 	className: PropTypes.string,
// 	value: PropTypes.string,
// 	type: PropTypes.string,
// 	placeholder: PropTypes.string,
// 	onChange: PropTypes.func
// };

// type HTMLInputRefProps = InputHTMLAttributes<HTMLInputElement>;

// interface InputRefProps extends HTMLInputRefProps {
// 	value?: string;
// 	type?: string;
// 	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputRef: FC<InputRefProps> = forwardRef<HTMLInputElement, InputRefProps>((props, ref?) => {
// 	const { type = 'text', value, onChange } = props;

// 	return <input innerRef={ref || undefined} className={classes.input} onChange={onChange} value={value} type={type} />;
// });
