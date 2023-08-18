import { FC, ForwardedRef, forwardRef, InputHTMLAttributes, memo, SVGProps } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '../Text/Text';
import classes from './Input.module.scss';
import { Icon } from '../Icon/Icon';
import { HStack } from '../Stack';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'placeholder' | 'value' | 'size' | 'readOnly' | 'onChange'
>;
type InputIconAlign = 'left' | 'right';
type FontSize = 's' | 'm' | 'l';

export interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	type?: string;
	placeholder?: string | null;
	label?: string;
	validation?: string | null;
	onChange?: (value: string) => void;
	readonly?: boolean;
	size?: FontSize;
	iconalign?: InputIconAlign;
	Svg?: FC<SVGProps<SVGSVGElement>>;
	dataTestId?: string;
}

const InputRef = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		placeholder,
		type = 'text',
		readonly = false,
		label = '',
		value = '',
		validation = '',
		iconalign = 'left',
		size = 'm',
		Svg,
		onChange,
		dataTestId = 'TextError',
		...otherProps
	} = props;

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
		<div className={classNames(classes.wrapper, {}, [className, classes[size]])}>
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
			<HStack gap={8} justify={'start'} max>
				{label && (
					<Text
						dataTestId={`${dataTestId}.Label`}
						content={label}
						size={size}
						variant={'primary'}
						align={'align-left'}
					/>
				)}
				<div className={classes.inputwrapper}>
					{iconalign === 'left' && Svg && (
						<Icon Svg={Svg} className={classNames(classes.searchicon, {}, [classes[iconalign]])} />
					)}
					<input
						data-testid={`${dataTestId}.Value`}
						ref={ref || undefined}
						className={classNames(classes.input, mods, [Svg ? classes[iconalign] : ''])}
						value={value}
						type={type}
						onChange={onChangeValue}
						readOnly={readonly}
						placeholder={placeholder ?? ''}
						{...otherProps}
					></input>
					{iconalign === 'right' && Svg && (
						<Icon Svg={Svg} className={classNames(classes.searchicon, {}, [classes[iconalign]])} />
					)}
				</div>
			</HStack>
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
