import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ButtonTheme, Button } from '@/shared/ui/deprecated/Button/Button';
import { Button as ButtonRedesign } from '@/shared/ui/redesign/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import classes from './LanguageSwitchButton.module.scss';

interface LanguageSwitchButtonProps {
	className?: string;
	short?: boolean;
}

export const LanguageSwitchComponent: FC<LanguageSwitchButtonProps> = memo(({ className, short }) => {
	const { t, i18n } = useTranslation(['translation']);

	const isRedesigned = className?.startsWith(classes.languageswitcherredesign);

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<div className={classNames(isRedesigned ? classes.languageswitcherredesign : classes.languageswitcher)}>
			{isRedesigned ? (
				<ButtonRedesign variant={'clear'} onClick={toggleLanguage}>
					{t(short ? 'short lng' : 'language')}
				</ButtonRedesign>
			) : (
				<Button theme={ButtonTheme.CLEAR} onClick={toggleLanguage}>
					{t(short ? 'short lng' : 'language')}
				</Button>
			)}
		</div>
	);
});

export const LanguageSwitchButton: FC<LanguageSwitchButtonProps> = (props: LanguageSwitchButtonProps) => {
	const { short = false, className = '' } = props;

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={
				<LanguageSwitchComponent
					short={short}
					className={classNames(classes.languageswitcher, {}, [className])}
				/>
			}
			on={
				<LanguageSwitchComponent
					short={short}
					className={classNames(classes.languageswitcherredesign, {}, [className])}
				/>
			}
		/>
	);
};
