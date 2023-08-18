import React, { memo } from 'react';
import classes from './AppLogo.module.scss';
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
		<HStack max justify="center" className={classNames(classes.appLogoWrapper, {}, [className])}>
			<Icon Svg={AppSvg} className={classes.appLogo} width={size} height={size} />
			{size > 50 && <div className={classes.gradientBig} />}
			<div className={classes.gradientSmall} />
		</HStack>
	);
});
