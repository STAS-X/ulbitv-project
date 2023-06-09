import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store';
import { getLogin } from '@/features/AuthByUserName/model/selectors/getUserData/getLoginData';
import { loginByUsername } from '@/features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '@/features/AuthByUserName/model/slices/loginSlice';
import { LoginSchema } from '@/features/AuthByUserName/model/types/loginSchema';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import classes from './FeedBackForm.module.scss';
import { HStack } from '../../../../shared/ui/Stack';

export interface FeedBackFormProps {
	className?: string;
	title?: string;
	onSuccess?: () => void;
	onFeedBack?: (feedback: string) => void;
	onClose?: () => void;
}

const reducers: ReducerList = {
	loginForm: loginReducer
};

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
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<div className={classNames(classes.feedbackform, {}, [className])}>
				<Text title={title ?? t('feedbackTitle')} />
				{/*error && <Text content={t('errorApp', { ns: 'errors', message: error })} theme={TextTheme.ERROR} />*/}
				<Input type="text" className={classes.input} onChange={onChangeFeedBack} value={feedBack} />

				<HStack className={classes.feedbackbtn} justify={'end'} gap={16} max>
					<Button theme={ButtonTheme.OUTLINE_RED} onClick={onFeedBackClose}>
						{t('cancel')}
					</Button>
					<Button theme={ButtonTheme.OUTLINE} disabled={!isEdited} onClick={onFeedBackSuccess}>
						{t('feedbackIn')}
					</Button>
				</HStack>
			</div>
		</DynamicModuleLoader>
	);
});

export default FeedBackForm;
