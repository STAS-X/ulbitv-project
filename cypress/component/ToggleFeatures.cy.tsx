import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { TestComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { setInitFeatureFlags } from '@/shared/lib/features/featureFlag';
import { AddArticleRating } from '@/features/AddArticleRating';
import { Card } from '@/shared/ui/Card/Card';
import '@/app/styles/index.scss';

describe('EditableProfileCard.cy.tsx', () => {
	const articleId = '10';
	before(() => {
		cy.viewport(700, 700);
		if (Cypress.mocha.getRunner().suite.ctx.currentTest.title.includes('AddArticleRating')) {
			// Устанавливаем флаг показа фичи true
			setInitFeatureFlags({ isFeatureRating: true });
			// ✅ RESPOND WITH OBJECT
			cy.fixture('ratings.json').then((rating) => {
				cy.toConsole(rating, 'get rating data');
				cy.intercept(
					{
						method: 'GET',
						url: `**/article-ratings?*`,
						query: { userId: rating.userId, articleId: rating.articleId },
						times: 10
					},
					{ body: [rating] }
				).as('UserRating');
				// application requests the /article-ratings/${article-ratings} resource
				// the intercept replies with the initial object
			});
		} else {
			setInitFeatureFlags({ isFeatureRating: false });
		}
	});

	it('Test visualize AddArticleRating feature', () => {
		cy.mount(
			<TestComponentRender
				initialState={{
					user: { authData: { id: '3', profileId: '3', features: { isFeatureRating: true } } }
				}}
			>
				<ToggleFeatures
					feature={'isFeatureRating'}
					on={<AddArticleRating articleId={`${articleId}`} />}
					off={
						<Card dataTestId={'ToggleFeatureOff'}>
							<span>Фича ArticleRating пока недоступна для Вас</span>
						</Card>
					}
				/>
			</TestComponentRender>
		);
		//cy.wait('@UserRating').then((response) => console.log(response, 'ответ от сервера получен!'));
		// Проверяем наличие компонента AddArticleRating и отсутствие карточки
		cy.getByTestId('Article.Rating.Frame').should('exist').wait(2000);
		cy.getByTestId('Rating.FeedBack').should('exist');
		cy.getByTestId('ToggleFeatureOff').should('not.exist');
	});

	// before(() => {
	// 	cy.viewport(700, 700);

	// });

	it('Test visualize Card feature', () => {
		cy.mount(
			<TestComponentRender
				initialState={{
					user: { authData: { id: '3', profileId: '3', features: { isFeatureRating: false } } }
				}}
			>
				<ToggleFeatures
					feature={'isFeatureRating'}
					on={<AddArticleRating articleId={`${articleId}`} />}
					off={
						<Card dataTestId={'ToggleFeatureOff'}>
							<span>Фича ArticleRating пока недоступна для Вас</span>
						</Card>
					}
				/>
			</TestComponentRender>
		);
		// Проверяем отсутствие компонента AddArticleRating и наличие карточки
		cy.getByTestId('Article.Rating.Frame').should('not.exist');
		cy.getByTestId('ToggleFeatureOff').should('exist', true);
	});
});
