import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';
import { Rating } from '@/entities/Rating';

const AboutPage: FC = memo(() => {
	const { t } = useTranslation(['translation', 'pages']);

	const handleAccept = (stars: number, feedback: string) => {
		console.log(`Статья получила оценку ${stars} и отзыв ${feedback ? feedback : 'не написан'}`);
	};
	const handleCancel = () => {
		console.log(`Пользователь отменил оценку статьи`);
	};

	return (
		<PageWrapper>
			{t('about')}
			<div style={{ width: 'max-content', marginTop: 20 }}>
				<Rating
					title={t('ratingArticleTitle')}
					feedBackTitle={t('feedbackTitle')}
					hasFeedBack={true}
					onCancel={handleCancel}
					onAccept={handleAccept}
				/>
			</div>
		</PageWrapper>
	);
});

export default AboutPage;
