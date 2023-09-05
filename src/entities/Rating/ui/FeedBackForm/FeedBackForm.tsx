import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Button } from '@/shared/ui/redesign/Button/Button';
import { Input } from '@/shared/ui/redesign/Input/Input';
import { Text } from '@/shared/ui/redesign/Text/Text';
import classes from './FeedBackForm.module.scss';
import { HStack } from '@/shared/ui/redesign/Stack';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '../../../../shared/ui/redesign/Card/Card';

export interface FeedBackFormProps {
	className?: string;
	title?: string;
	onSuccess?: (feedback: string) => Promise<any>;
	onClose?: () => Promise<any>;
}

const FeedBackForm: FC<FeedBackFormProps> = memo((props: FeedBackFormProps) => {
	const { className, title, onSuccess, onClose } = props;
	const { t } = useTranslation(['translation', 'errors']);
	//const dispatch = useAppDispatch();

	const [feedBack, setFeedBack] = useState('');
	const [isEdited, setIsEdited] = useState(false);

	const onChangeFeedBack = useCallback(
		(value: string) => {
			setFeedBack(value);
		},
		[setFeedBack]
	);
	// const onChangePassword = useCallback(
	// 	(value: string) => {
	// 		dispatch(loginActions.setUserPassword(value));
	// 	},
	// 	[dispatch]
	// );

	useEffect(() => {
		setIsEdited(Boolean(feedBack));
	}, [feedBack]);

	const onFeedBackClose = useCallback(() => {
		(async () => await onClose?.())();
	}, [onClose]);
	const onFeedBackSuccess = useCallback(() => {
		(async () => {
			await onSuccess?.(feedBack);
		})();
	}, [onSuccess, feedBack]);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card
					data-testid={'Rating.FeedBack.Form'}
					className={classNames(classes.feedbackformredesign, {}, [className])}
					paddings={24}
					border={'round'}
				>
					<Text title={title ?? t('feedbackTitle')} />
					{/*error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />*/}
					<Input
						dataTestId={'Rating.FeedBack'}
						type="text"
						placeholder={t('feedbackSign')}
						className={classes.input}
						onChange={onChangeFeedBack}
						value={feedBack}
					/>
					<HStack className={classes.feedbackbtn} justify={'end'} gap={16}
max>
						<Button dataTestId={'Rating.FeedBack.Cancel'} variant={'outline_red'} onClick={onFeedBackClose}>
							{t('cancel')}
						</Button>
						<Button
							dataTestId={'Rating.FeedBack.Submit'}
							variant={'outline'}
							disabled={!isEdited}
							onClick={onFeedBackSuccess}
						>
							{t('feedbackIn')}
						</Button>
					</HStack>
				</Card>
			}
			off={
				<div data-testid={'Rating.FeedBack.Form'} className={classNames(classes.feedbackform, {}, [className])}>
					<TextDeprecated title={title ?? t('feedbackTitle')} />
					{/*error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />*/}
					<InputDeprecated
						dataTestId={'Rating.FeedBack'}
						type="text"
						placeholder={t('feedbackSign')}
						className={classes.input}
						onChange={onChangeFeedBack}
						value={feedBack}
					/>
					<HStack className={classes.feedbackbtn} justify={'end'} gap={16}
max>
						<ButtonDeprecated
							dataTestId={'Rating.FeedBack.Cancel'}
							theme={ButtonTheme.OUTLINE_RED}
							onClick={onFeedBackClose}
						>
							{t('cancel')}
						</ButtonDeprecated>
						<ButtonDeprecated
							dataTestId={'Rating.FeedBack.Submit'}
							theme={ButtonTheme.OUTLINE}
							disabled={!isEdited}
							onClick={onFeedBackSuccess}
						>
							{t('feedbackIn')}
						</ButtonDeprecated>
					</HStack>
				</div>
			}
		/>
	);
});

export default FeedBackForm;
