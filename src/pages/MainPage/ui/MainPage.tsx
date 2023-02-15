import { useTranslation } from "react-i18next";

const MainPage = () => {
		const { t } = useTranslation(['pages']);

		return <div>{t('main')}</div>;
};

export default MainPage;
