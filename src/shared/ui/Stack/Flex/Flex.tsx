import { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { convertToProperty } from '../../../lib/helpers/propertyToFlex';
import classes from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
	className?: string;
	children: ReactNode;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	gap?: number;
	max?: boolean;
	dataTestId?: string;
}

export const Flex: FC<FlexProps> = (props: FlexProps) => {
	const {
		className,
		children,
		justify = 'start',
		align = 'center',
		direction = 'column',
		gap = 8,
		dataTestId = 'Stack',
		style,
		...others
	} = props;
	//console.log(convertToProperty(justify), convertToProperty(align), props, 'justify');

	return (
		<div
			data-testid={dataTestId}
			data-cy={dataTestId}
			className={classNames(classes.Flex, {}, [className])}
			style={{
				...style,
				justifyContent: convertToProperty(justify),
				alignItems: convertToProperty(align),
				flexDirection: direction,
				gap
			}}
			{...others}
		>
			{children}
		</div>
	);
};
