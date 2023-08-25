import { useTheme } from '@/shared/lib/hooks/useTheme';
import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import ThemeRedesignIcon from '@/shared/assets/icons/theme-32-32.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { saveJSONSettingsByUser } from '@/entities/User';
import classes from './ThemeSwitchButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Icon, IconTheme } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon as IconRedesign } from '@/shared/ui/redesign/Icon/Icon';

export interface ThemeSwitchButtonProps {
	className?: string;
}

const ThemeSwitcherComponent: FC<ThemeSwitchButtonProps> = memo((props: ThemeSwitchButtonProps) => {
	const { className = '' } = props;
	const { toggleTheme } = useTheme();
	//const [fillColor, setFillColor] = useState('');
	const dispatch = useAppDispatch();

	const isRedesigned = className !== classes.themeswitcher;
	console.log(isRedesigned, 'is redesigned theme switch');

	const onToggleTheme = useCallback(() => {
		toggleTheme((theme) => {
			const saveSettings = async () => {
				await dispatch(saveJSONSettingsByUser({ theme }));
			};
			void saveSettings();
			//console.log(theme, 'on toggle theme');
		});
	}, [dispatch, toggleTheme]);

	// useEffect(() => {
	// 	const rootThemeElement = document.body.getElementsByClassName(theme)?.[0];
	// 	if (rootThemeElement) {
	// 		const bgColor = getComputedStyle(rootThemeElement).getPropertyValue('--theme-icon-flood-color');
	// 		setFillColor(bgColor);
	// 	}
	// }, [theme]);

	return isRedesigned ? (
		<IconRedesign
			Svg={ThemeRedesignIcon}
			className={classes.iconredesign}
			width={40}
			height={40}
			onClick={onToggleTheme}
			clickable
		/>
	) : (
		<Button className={classNames('', {}, [className])} onClick={onToggleTheme} theme={ButtonTheme.OUTLINE}>
			<Icon Svg={ThemeIcon} className={classes.icon} width={48} height={48} theme={IconTheme.INVERTED} />
		</Button>
	);
});

export const ThemeSwitchButton: FC<ThemeSwitchButtonProps> = () => {
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<ThemeSwitcherComponent className={classes.themeswitcher} />}
			on={<ThemeSwitcherComponent className={classes.themeswitcherredesign} />}
		/>
	);
};
