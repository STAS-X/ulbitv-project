import { ForwardedRef, forwardRef, InputHTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import Search from '@/shared/assets/icons/search.svg';
import { Text } from '../Text/Text';
import classes from './Input.module.scss';
import { Icon } from '../Icon/Icon';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'value' | 'readOnly' | 'onChange'>;
type InputIconAlign = 'left' | 'right';

export interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	type?: string;
	placeholder?: string;
	validation?: string | null;
	onChange?: (value: string) => void;
	readonly?: boolean;
	iconalign?: InputIconAlign;
	dataTestId?: string;
}

const InputRef = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		placeholder = 'userName',
		type = 'text',
		readonly = false,
		value = '',
		validation = '',
		iconalign = 'left',
		onChange,
		dataTestId = 'TextError',
		...otherProps
	} = props;
	const { t } = useTranslation();

	const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value }
		} = event;
		onChange?.(value);
		//console.log(`current value is ${value}`);
	};

	const mods: Mods = {
		[classes.readonly]: readonly
	};

	return (
		<div className={classNames(classes.wrapper, {}, [className])}>
			{validation && (
				<div className={classes.validation}>
					<Text
						dataTestId={`${dataTestId}.Validation`}
						content={validation}
						variant={'error'}
						align={'align-left'}
					/>
				</div>
			)}
			{/*placeholder && <span className={classes.placeholder}>{`${t(placeholder)}>`}</span>*/}
			<div className={classes.inputwrapper}>
				{iconalign === 'left' && (
					<Icon Svg={Search} className={classNames(classes.searchicon, {}, [classes[iconalign]])} />
				)}
				<input
					data-testid={`${dataTestId}.Value`}
					ref={ref || undefined}
					className={classNames(classes.input, mods, [classes[iconalign]])}
					value={value}
					type={type}
					onChange={onChangeValue}
					readOnly={readonly}
					placeholder={t(placeholder)}
					{...otherProps}
				></input>
				{iconalign === 'right' && (
					<Icon Svg={Search} className={classNames(classes.searchicon, {}, [classes[iconalign]])} />
				)}
			</div>
		</div>
	);
};

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
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
