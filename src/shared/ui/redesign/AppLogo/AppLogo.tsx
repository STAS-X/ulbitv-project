import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';

interface AppLogoProps {
	className?: string;
	size?: string | number;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const AppLogo = memo(({ className, size = 64 }: AppLogoProps) => {
	return (
		<HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
			{size > 50 && <div className={cls.gradientBig} />}
			<div className={cls.gradientSmall} />
			<Icon Svg={AppSvg} className={cls.appLogo} width={size} height={size} />
		</HStack>
	);
});
