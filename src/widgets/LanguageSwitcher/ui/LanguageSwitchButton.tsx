import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface LanguageSwitchButtonProps {
	className?: string;
}

export const LanguageSwitchButton: FC<LanguageSwitchButtonProps> = ({ className }) => {
	const { t, i18n } = useTranslation(['translation']);

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<div className={classNames('', {}, [className])}>
			<Button theme={ThemeButton.CLEAR} onClick={toggleLanguage}>
				{t('language')}
			</Button>
		</div>
	);
};
