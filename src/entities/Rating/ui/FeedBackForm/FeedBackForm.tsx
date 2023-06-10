import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text } from '@/shared/ui/Text/Text';
import classes from './FeedBackForm.module.scss';
import { HStack } from '../../../../shared/ui/Stack';

export interface FeedBackFormProps {
	className?: string;
	title?: string;
	onSuccess?: () => void;
	onFeedBack?: (feedback: string) => void;
	onClose?: () => void;
}

const FeedBackForm: FC<FeedBackFormProps> = memo((props: FeedBackFormProps) => {
	const { className, title, onFeedBack, onSuccess, onClose } = props;
	const { t } = useTranslation(['translation', 'errors']);
	//const dispatch = useAppDispatch();

	const [feedBack, setFeedBack] = useState('');
	const [isEdited, setIsEdited] = useState(false);

	const onChangeFeedBack = useCallback(
		(value: string) => {
			setFeedBack(value);
			onFeedBack?.(value);
		},
		[setFeedBack, onFeedBack]
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
	const onFeedBackSuccess = useCallback(() => onSuccess?.(), [onSuccess]);

	return (
		<div className={classNames(classes.feedbackform, {}, [className])}>
			<Text title={title ?? t('feedbackTitle')} />
			{/*error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />*/}
			<Input
				type="text"
				placeholder={t('feedbackSign')}
				className={classes.input}
				onChange={onChangeFeedBack}
				value={feedBack}
			/>

			<HStack className={classes.feedbackbtn} justify={'end'} gap={16} max>
				<Button theme={ButtonTheme.OUTLINE_RED} onClick={onFeedBackClose}>
					{t('cancel')}
				</Button>
				<Button theme={ButtonTheme.OUTLINE} disabled={!isEdited} onClick={onFeedBackSuccess}>
					{t('feedbackIn')}
				</Button>
			</HStack>
		</div>
	);
});

export default FeedBackForm;
