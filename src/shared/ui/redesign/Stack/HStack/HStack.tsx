import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Flex, FlexProps } from '../Flex/Flex';
import classes from './HStack.module.scss';

export type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Используем новые компоненты из папки redesigned
 */
export const HStack: FC<HStackProps> = (props: HStackProps) => {
	const { className, children, max = false, ...otherProps } = props;
	const { t } = useTranslation();

	return (
		<Flex
			className={classNames(classes.HStack, { [classes.max]: max }, [className])}
			direction={'row'}
			{...otherProps}
		>
			{children}
		</Flex>
	);
};
