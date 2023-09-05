import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Input as InputRedesign } from '@/shared/ui/redesign/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button as ButtonRedesign } from '@/shared/ui/redesign/Button/Button';
import classes from './AddCommentForm.module.scss';
import { useSelector } from 'react-redux';
import {
	getAddCommentContent,
	getAddCommentError,
	getAddCommentIsLoading
} from '../../model/selectors/addCommentFormData';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { CommentSchema } from '@/entities/Comment';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '@/shared/ui/redesign/Card/Card';

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
		if (content) {
			if (onSendComment) onSendComment(content);
		}
	}, [content, onSendComment]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Card
						className={classes.addCommentformredesign}
						dataTestId={'Article.CommentForm'}
						paddings={16}
						border={'standart'}
						max
					>
						{error ? (
							<HStack justify={'between'} max>
								<TextRedesign
									variant={'error'}
									title={t('commentForm')}
									content={t('commentError', { ns: 'errors', message: error })}
								/>
								<ButtonRedesign variant={'outline'} disabled>
									{t('commentSubmit')}
								</ButtonRedesign>
							</HStack>
						) : (
							<HStack justify={'between'} max>
								<InputRedesign
									dataTestId={'Article.Comment'}
									className={classes.input}
									placeholder={t('commentPlaceholder')}
									value={content || ''}
									onChange={onCommentFormChange}
								/>
								<ButtonRedesign
									dataTestId={'Article.Comment.Add'}
									variant={'outline'}
									onClick={handleSendComment}
									disabled={!content || content.length === 0 || isLoading}
								>
									{t('commentSubmit')}
								</ButtonRedesign>
							</HStack>
						)}
					</Card>
				}
				off={
					<VStack
						dataTestId={'Article.CommentForm'}
						gap={10}
						className={classNames(classes.addCommentform, {}, [className])}
						max
					>
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
									dataTestId={'Article.Comment'}
									className={classes.input}
									placeholder={t('commentPlaceholder')}
									value={content || ''}
									onChange={onCommentFormChange}
								/>
								<Button
									dataTestId={'Article.Comment.Add'}
									theme={ButtonTheme.OUTLINE}
									onClick={handleSendComment}
									disabled={!content || content.length === 0 || isLoading}
								>
									{t('commentSubmit')}
								</Button>
							</HStack>
						)}
					</VStack>
				}
			/>
		</DynamicModuleLoader>
	);
};
export default AddCommentForm;
