import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';

const AdminPanelPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);

	return <PageWrapper data-testid={'AdminPage'}>{t('adminpanel')}</PageWrapper>;
});

export default AdminPanelPage;
