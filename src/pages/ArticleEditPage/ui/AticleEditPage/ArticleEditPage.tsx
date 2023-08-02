import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import classes from './ArticleEditPage.module.scss';
import { useParams } from 'react-router-dom';

export interface AticleEditPageProps {
	className?: string;
	children?: ReactNode;
}

const AticleEditPage: FC<AticleEditPageProps> = (props: AticleEditPageProps) => {
	const { className } = props;
	const { t } = useTranslation(['articles']);
	const { id } = useParams<{ id: string }>();
	const isEditable = Boolean(id);

	return (
		<PageWrapper className={classNames(classes.AticleEditPage, {}, [className])}>
			{isEditable ? t('editArticleId', { id }) : t('newArticle')}
		</PageWrapper>
	);
};

export default AticleEditPage;
