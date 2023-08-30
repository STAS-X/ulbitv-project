import { FC, memo } from 'react';
import { Card } from '@/shared/ui/redesign/Card/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { useSelector } from 'react-redux';
import classes from './ArticleInfoContainer.module.scss';
import { getArticleAdditinalInfo } from '@/entities/Article';

export interface ArticleInfoContainerProps {
	className?: string;
}

export const ArticleInfoContainer: FC<ArticleInfoContainerProps> = memo((props: ArticleInfoContainerProps) => {
	const { className } = props;

	const additionalInfo = useSelector(getArticleAdditinalInfo);

	return (
		<Card className={classes.infocontainer} paddings={24} border={'partial'} max>
			{additionalInfo && <ArticleAdditionalInfo {...additionalInfo} className={className} />}
		</Card>
	);
});
