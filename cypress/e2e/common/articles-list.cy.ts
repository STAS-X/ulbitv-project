describe('Тесты на динамический компонент подгрузки статей для страницы ArticlesPage', () => {
	beforeEach(function () {
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((userData) => {
			expect(userData).to.have.property('username', 'testuser');
			cy.visit(`/articles`);
			// Should be contain ArtickesPage text element
			cy.getByTestId('ArticlesPage').should('exist', true);
		});
		// run these tests as if in a desktop
		// browser with a 960p monitor
		cy.viewport(1536, 960)
	});

	afterEach(() => {
		// Выходим из профиля и переходим на главную страницу
		cy.logOut();
	});

	it('Тестируем подгрузку статей на странице', () => {
		// Переключаем вид показа в плитку
		cy.getByTestId('ArticleSortSelector').should('exist', true).getByTestId('Button.TILE').click().invoke('attr','class').should('match',/ _selected_/);
		cy.getByTestId('ArticleList').should('exist', true).getByTestId('ArticleItem').its('length').should('be.gte', 3);

	});

	it('Тестируем фильтрацию статей по тематике', () => {
		// Выбираем статьи по тематике Экономика, проверяем, что кнопка 
		cy.getByTestId('ArticleCategorySelector').should('exist', true).getByTestId('Article.Category.SCIENCE').as('Category.SCIENCE').click().invoke('attr', 'class').should('match', / _selected_/);
		cy.getByTestId('ArticleList').should('exist', true).getByTestId('ArticleItem').its('length').should('be.gte', 1);
		cy.get('@Category.SCIENCE').click();
	});

	it('Тестируем сортировку статей по Просмотрам на убывание/возрастание', () => {
		// Выбираем сортировку статей по полю Просмотры в направлении возрастания
		cy.getByTestId('ArticleSortSelector').should('exist', true).getByTestId('Article.Sort.Field.Value').select('Просмотры').should('have.value','views');
		cy.getByTestId('ArticleSortSelector').should('exist', true).getByTestId('Article.Sort.Order.Value').select('возрастание').should('have.value', 'asc');
		// Проверяем смену сортировки статей на листе
		cy.getByTestId('ArticleItem').as('FiltredArticle').its('length').should('be.gte', 3);
		cy.get('@FiltredArticle').eq(0).getByTestId('Article.Title.Header').should('contain.text', 'ASP.NET news');
		// Выбираем сортировку статей по полю Просмотры в направлении убывания
		cy.getByTestId('ArticleSortSelector').should('exist', true).getByTestId('Article.Sort.Order.Value').select('убывание').should('have.value', 'desc');
		// Проверяем смену сортировки статей на листе
		cy.getByTestId('ArticleItem').as('FiltredArticle').its('length').should('be.gte', 3);
		cy.get('@FiltredArticle').eq(0).getByTestId('Article.Title.Header').should('contain.text', 'Python news');

	});

	it('Тестируем фильтрацию статей по полю поиска', () => {
		// Выбираем поле поиска и вводим текст для фильтрации статей
		cy.getByTestId('ArtricleSearch').should('exist', true).getByTestId('Article.Filter.Value').as('Filter').clear().type('Visual').should('have.value', 'Visual');
		// Проверяем количество статей после фильтрации
		cy.getByTestId('ArticleItem').its('length').should('be.gte', 1);
		// Очищаем поисковую строку
		cy.get('@Filter').clear();
		// Проверяем возвращеие исходного количества статей
		cy.getByTestId('ArticleItem').its('length').should('be.gte', 3);

	});

});