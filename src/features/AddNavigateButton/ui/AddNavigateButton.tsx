import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button as ButtonRedesign } from '@/shared/ui/redesign/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface NavigateButtonProps {
	className?: string;
	navigateTo: string;
	title?: string;
	children?: ReactNode;
}

export const AddNavigateButton: FC<NavigateButtonProps> = (props: NavigateButtonProps) => {
	const { t } = useTranslation(['articles']);

	const { className, navigateTo, title = t('backToList') } = props;

	const navigate = useNavigate();

	const navigateToList = useCallback(() => {
		navigate(navigateTo);
	}, [navigate, navigateTo]);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<ButtonRedesign className={className} variant={'outline'} onClick={navigateToList}>
					{title}
				</ButtonRedesign>
			}
			off={
				<Button className={className} theme={ButtonTheme.OUTLINE} onClick={navigateToList}>
					{title}
				</Button>
			}
		/>
	);
};
