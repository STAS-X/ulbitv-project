import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import classes from './AddCommentForm.module.scss';
import { useSelector } from 'react-redux';
import {
	getAddCommentContent,
	getAddCommentError,
	getAddCommentIsLoading
} from '../../model/selectors/addCommentFormData';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { CommentSchema } from '@/entities/Comment';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack, VStack } from '@/shared/ui/Stack';

export interface AddCommentFormProps {
	className?: string;
	onSendComment?: (content: string) => CommentSchema | string | undefined | void;
}

const reducers: ReducerList = {
	addCommentForm: addCommentFormReducer
};

const AddCommentForm: FC<AddCommentFormProps> = (props: AddCommentFormProps) => {
	const { onSendComment, className } = props;
	const { t } = useTranslation(['comments', 'errors']);

	const content = useSelector(getAddCommentContent);
	const error = useSelector(getAddCommentError);
	const isLoading = useSelector(getAddCommentIsLoading);
	const dispatch = useAppDispatch();

	const onCommentFormChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setCommentContent(value));
		},
		[dispatch]
	);

	const handleSendComment = useCallback(() => {
		console.log(content, 'get comment data');
		if (content) {
			if (onSendComment) onSendComment(content);
		}
	}, [content, onSendComment]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack gap={10} className={classNames(classes.addCommentform, {}, [className])} max>
				{error ? (
					<HStack justify={'between'} max>
						<Text
							theme={TextTheme.ERROR}
							title={t('commentForm')}
							content={t('commentError', { ns: 'errors', message: error })}
						/>
						<Button theme={ButtonTheme.OUTLINE} disabled>
							{t('commentSubmit')}
						</Button>
					</HStack>
				) : (
					<HStack justify={'between'} max>
						<Input
							className={classes.input}
							placeholder={t('commentPlaceholder')}
							value={content || ''}
							onChange={onCommentFormChange}
						/>
						<Button
							theme={ButtonTheme.OUTLINE}
							onClick={handleSendComment}
							disabled={!content || content.length === 0 || isLoading}
						>
							{t('commentSubmit')}
						</Button>
					</HStack>
				)}
			</VStack>
		</DynamicModuleLoader>
	);
};
export default AddCommentForm;
