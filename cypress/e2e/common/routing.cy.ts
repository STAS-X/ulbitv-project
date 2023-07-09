import { checkClassList } from '../../support/common/helpers';

const USER_LS_KEY = 'user';

describe('Тесты на компонент роутинга', () => {
	beforeEach(function () {
		//cy.wrap({}).as('userData');
	});

	afterEach(() => {
		cy.logOut();
	});

	it('Переход на главную страницу проекта MainPage', () => {
		cy.visit('/');
		// Should be contain Main text element
		cy.getByTestId('MainPage').contains('Главная');
		// Should be in URL include
		cy.url().should('include', '/');
	});

	it('Переход на страницу О проекте AboutPage', () => {
		cy.visit('/about');
		// Should be contain About text element
		cy.getByTestId('AboutPage').contains('О сайте');
		// Should be in URL include
		cy.url().should('include', 'about');
	});

	it('Переход на страницу проекта без авторизации ProfilePage', () => {
		cy.visit('/profile');
		// Без авторизации будет произведен редирект на страницу NotFound
		// Should be contain NotFound text element
		cy.getByTestId('NotFoundPage').contains(`Страница 'profile' не найдена`);
		// Should be in URL include
		cy.url().should('include', 'profile');
	});

	it('Переход на страницу проекта с авторизацией ProfilePage', function () {
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((userData) => {
			expect(userData).to.have.property('username', 'testuser');
			cy.visit(`/profile/${userData?.profileId}`);
			// Без авторизации будет произведен редирект на страницу NotFound
			// Should be contain ProfilePage text element
			cy.getByTestId('ProfilePage').as('ProfilePage');
			const profilePage = cy.get('@ProfilePage');
			profilePage.contains('Профиль');
			let editBtn = cy.getByTestId('ProfileCard.EditBtn');
			editBtn.contains('Редактировать');
			editBtn.click();
			const cancelBtn = cy.getByTestId('ProfileCard.CancelBtn');
			cancelBtn.should('exist', true);
			cancelBtn.click();
			editBtn = cy.getByTestId('ProfileCard.EditBtn');
			editBtn
				.should('exist', true)
				.should('have.css', 'color', 'rgb(17, 88, 253)')
				.should('satisfy', checkClassList(['_button_*', '_editbtn_*']));
			// Should be in URL include
			cy.url().should('include', `profile/${userData.profileId}`);
		});
	});

	it('Переход на страницу проекта со списком статей ArticlesPage', () => {
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((data) => {
			expect(data).to.have.property('username', 'testuser');
			// Переходим на страницу статей
			cy.visit('/articles');
			// Should be contain ArticlesPage text element
			cy.getByTestId('ArticlesPage').as('ArticlesPage');
			const articlesPage = cy.get('@ArticlesPage');
			articlesPage.should('exist');
			// Should be in URL include
			cy.url().should('include', 'articles');
		});
	});

	it('Переход на страницу проекта со статьей 1 ArticlePage', () => {
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((data) => {
			expect(data).to.have.property('username', 'testuser');
			// Переходим на страницу статьи 1
			cy.visit('/articles/1');
			// Should be contain ArticleDetailesPage text element
			cy.getByTestId('ArticleDetailesPage').as('Article');
			const article = cy.get('@Article');
			article.should('exist');
			// Should be in URL include
			cy.url().should('include', 'articles/1');
		});
	});
});

export {};
