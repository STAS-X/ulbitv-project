import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesign/Stack';
import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

const SettingsPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);

	return (
		<PageWrapper data-testid={'SettingsPage'}>
			<VStack gap={24}>
				{t('settingsPage')}
				{<UIDesignSwitcher/>}
			</VStack>
		</PageWrapper>
	);
});

export default SettingsPage;
