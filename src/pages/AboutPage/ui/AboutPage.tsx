import { useTranslation } from "react-i18next";

const AboutPage = () => {
	const {t} = useTranslation(['pages']);

	return <div>{t('about') && t('about33322')}</div>;
};

export default AboutPage;
