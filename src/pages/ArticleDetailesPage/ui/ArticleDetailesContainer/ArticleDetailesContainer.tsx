import { FC, memo } from 'react';
import { ArticleDetailes } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesign/Card/Card';

export interface ArticleDetailesContainerProps {
	className?: string;
}

export const ArticleDetailesContainer: FC<ArticleDetailesContainerProps> = memo(
	(props: ArticleDetailesContainerProps) => {
		const { className } = props;

		const { id } = useParams<{ id: string }>();

		return (
			<Card className={className} paddings={24} border={'round'} max>
				<ArticleDetailes articleId={id} />
			</Card>
		);
	}
);
