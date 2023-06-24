import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ButtonTheme, Button } from '@/shared/ui/Button/Button';

interface LanguageSwitchButtonProps {
	className?: string;
	short?: boolean;
}

export const LanguageSwitchButton: FC<LanguageSwitchButtonProps> = memo(({ className, short }) => {
	const { t, i18n } = useTranslation(['translation']);

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<div className={classNames('', {}, [className ?? ''])}>
			<Button theme={ButtonTheme.CLEAR} onClick={toggleLanguage}>
				{t(short ? 'short lng' : 'language')}
			</Button>
		</div>
	);
});
