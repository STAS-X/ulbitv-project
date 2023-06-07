import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Flex, FlexProps } from '../Flex/Flex';
import classes from './VStack.module.scss';

export type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack: FC<VStackProps> = (props: VStackProps) => {
	const { className, children, align = 'start', max = false, ...otherProps } = props;
	const { t } = useTranslation();

	return (
		<Flex
			className={classNames(classes.VStack, { [classes.max]: max }, [className])}
			direction={'column'}
			align={align}
			{...otherProps}
		>
			{children}
		</Flex>
	);
};
