import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../../redesign/Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';

interface AppLogoProps {
	className?: string;
	isSmall?: boolean;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const AppLogo = memo(({ className, isSmall = false }: AppLogoProps) => {
	return (
		<HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
			{!isSmall && <div className={cls.gradientBig} />}
			<div className={cls.gradientSmall} />
			<Icon Svg={AppSvg} className={cls.appLogo} width={isSmall ? 40 : 64} />
		</HStack>
	);
});
