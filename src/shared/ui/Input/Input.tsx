import { FC, ForwardedRef, forwardRef, InputHTMLAttributes, memo, ReactComponentElement } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	type?: string;
	placeholder?: string;
	ref: ForwardedRef<HTMLInputElement>;
	onChange?: (value: string) => void;
}

export const Input = memo(
	forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
		const { className, placeholder = 'userName', type = 'text', value, onChange, ...otherProps } = props;
		const { t } = useTranslation();

		const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
			const {
				target: { value }
			} = event;
			onChange?.(value);
			console.log(`current value is ${value}`);
		};

		return (
			<div className={classNames(classes.inputwrapper, {}, [className])}>
				{placeholder && <div className={classes.plaseholder}>{`${t(placeholder)}>`}</div>}
				<div className={classes.caretwrapper}>
					<InputRef
						ref={ref}
						className={classes.input}
						value={value}
						type={type}
						onChange={onChangeValue}
						{...otherProps}
					></InputRef>
					<span className={classes.caret}></span>
				</div>
			</div>
		);
	})
);

type HTMLInputRefProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
	ref?: React.Ref<HTMLInputElement>;
};

interface InputRefProps extends HTMLInputRefProps {
	className?: string;
	value?: string;
	type?: string;
	placeholder?: string;
}

const InputRef: FC<InputRefProps> = forwardRef<HTMLInputElement, InputRefProps>((props, ref) => {
	const { type = 'text', value, ...otherProps } = props;

	return <input ref={ref} className={classes.input} value={value} type={type} {...otherProps} />;
});
