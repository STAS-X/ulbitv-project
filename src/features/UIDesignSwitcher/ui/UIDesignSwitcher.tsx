import { FC, memo, useCallback, useState } from 'react';
import { getUserId, useFeaturesByKey } from '@/entities/User';
import { Button } from '@/shared/ui/redesign/Button/Button';
import { Button as ButtonDepracated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { FeatureFlags } from '@/shared/lib/features/featureFlag';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { updateFeaturesByUserId } from '../model/services/updateFeaturesByUserId';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import { TextSize, TextTheme, Text } from '@/shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';

export const UIDesignSwitcher: FC = memo(() => {
	const { t } = useTranslation('translation');

	const userId = useSelector(getUserId);
	const isAppRedesigned = useFeaturesByKey('isAppRedesigned');
	//const [updateUserFeatures, { isLoading }] = useUpdateUserFeaturesMutation();
	const [isLoading, setIsLoading] = useState(false);

	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesigned', on: SkeletonRedesign, off: SkeletonDeprecated });

	const dispatch = useAppDispatch();

	const changeFeatures = useCallback(
		(featureName: keyof FeatureFlags, value: boolean) => {
			(async () => {
				try {
					if (userId) {
						setIsLoading(true);
						const response = await dispatch(
							updateFeaturesByUserId({ id: userId, features: { [featureName]: value } })
						).unwrap();
					}
				} catch (error) {
					console.log(error, 'error occured');
				}
				setIsLoading(false);
			})();
		},
		[dispatch, userId]
	);
	//console.warn(isFirstVisit, settings, 'get isFirstVisit from back server');

	return isLoading ? (
		<Skeleton width={200} height={50} border={15} />
	) : (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				userId ? (
					<Button variant={'outline'} onClick={() => changeFeatures('isAppRedesigned', !isAppRedesigned)}>
						{isAppRedesigned ? (
							<span>{t('designSwitch.old')}</span>
						) : (
							<span>{t('designSwitch.modern')}</span>
						)}
					</Button>
				) : (
					<TextRedesign variant={'error'} size={'l'} title={t('authNeed')} />
				)
			}
			off={
				userId ? (
					<ButtonDepracated
						theme={ButtonTheme.OUTLINE}
						onClick={() => changeFeatures('isAppRedesigned', !isAppRedesigned)}
					>
						{isAppRedesigned ? <span>{t('designSwitch.old')}</span> : <span>{t('designSwitch.modern')}</span>}
					</ButtonDepracated>
				) : (
					<Text theme={TextTheme.ERROR} size={TextSize.L} title={t('authNeed')} />
				)
			}
		/>
	);
});
