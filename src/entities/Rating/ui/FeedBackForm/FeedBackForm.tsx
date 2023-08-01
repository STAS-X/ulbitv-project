import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text } from '@/shared/ui/Text/Text';
import classes from './FeedBackForm.module.scss';
import { HStack } from '@/shared/ui/Stack';

export interface FeedBackFormProps {
	className?: string;
	title?: string;
	onSuccess?: (feedback: string) => void;
	onClose?: () => void;
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

	const onFeedBackClose = useCallback(() => onClose?.(), [onClose]);
	const onFeedBackSuccess = useCallback(() => {
		onSuccess?.(feedBack);
	}, [onSuccess, feedBack]);

	return (
		<div data-testid={'Rating.FeedBack.Form'} className={classNames(classes.feedbackform, {}, [className])}>
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
				<Button dataTestId={'Rating.FeedBack.Cancel'} theme={ButtonTheme.OUTLINE_RED} onClick={onFeedBackClose}>
					{t('cancel')}
				</Button>
				<Button
					dataTestId={'Rating.FeedBack.Submit'}
					theme={ButtonTheme.OUTLINE}
					disabled={!isEdited}
					onClick={onFeedBackSuccess}
				>
					{t('feedbackIn')}
				</Button>
			</HStack>
		</div>
	);
});

export default FeedBackForm;
