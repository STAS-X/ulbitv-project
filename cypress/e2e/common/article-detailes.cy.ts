import { ArticleType, ArticleBlockType } from './../../../src/entities/Article/model/types/articleSchema';

const articleData = {
	title: 'Javascript news',
	subtitle: 'Что нового в JS за 2022 год?',
	img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
	views: 1022,
	createdAt: '26.02.2022',
	userId: '3',
	type: [ArticleType.IT],
	blocks: [
		{
			id: '1',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
			]
		},
		{
			id: '4',
			type: ArticleBlockType.CODE,
			code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
		},
		{
			id: '5',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
			]
		},
		{
			id: '2',
			type: ArticleBlockType.IMAGE,
			src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
			title: 'Рисунок 1 - скриншот сайта'
		},
		{
			id: '3',
			type: ArticleBlockType.CODE,
			code: 'const path = require("path");\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, "db.json"));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);'
		},
		{
			id: '7',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
			]
		},
		{
			id: '8',
			type: ArticleBlockType.IMAGE,
			src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
			title: 'Рисунок 1 - скриншот сайта'
		},
		{
			id: '9',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.'
			]
		}
	]
};

describe('Тесты на создание статьи и визуализации ее на странице ArticleDetailesPage', () => {
	beforeEach(function () {
		// Обнуляем переменные cypress storage перед каждым тестом
		Cypress.env('articles', []);
		Cypress.env('comments', []);
		Cypress.env('user', {});

		// Добавляем перехватчик запросов добавленя комментария
		cy.catchPostComment();
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((userData) => {
			expect(userData).to.have.property('username', 'testuser');
			Cypress.env('user', { id: userData.id, username: userData.username });
			cy.intercept('/articles').as('PageLoader');
			cy.visit(`/articles`);
			cy.wait('@PageLoader');
			// Should be contain ArtickesPage text element
			cy.getByTestId('ArticlesPage').should('exist', true);
		});
		// Добавляем новую статью для тестирования
		cy.addNewArticle(articleData);
		// run these tests as if in a desktop
		// browser with a 960p monitor
		cy.viewport(1536, 960);
	});

	afterEach(() => {
		//cy.toConsole(Cypress.env(), 'get all data from Cypress ENV');
		// Удаляем все ранее добавленные комменты и статьи
		Cypress.env('comments').forEach(({ id: commentId }) => cy.deleteCommentById(commentId));
		Cypress.env('articles').forEach(({ articleId }) => cy.deleteArticleById(articleId));
		// Обнуляем переменный cypress storage после теста
		Cypress.env('articles', []);
		Cypress.env('comments', []);
		Cypress.env('user', {});
		// Выходим из профиля и переходим на главную страницу
		cy.logOut();
	});

	it('Создание новой статьи на базе шаблона', () => {
		// Добавляем новую статью по шаблону
		const articleId = Cypress.env('articles')?.[0].articleId;
		//cy.toConsole(`${article.articleId}`, 'get env data');
		// cy.deleteArticleById(article[0].articleId);
		// console.log(article[1].articleId, 'get article by request');
		cy.wrap({ articleId }).its('articleId').should('eq', articleId);
		// Переходим на страницу со статьей
		cy.intercept(`/articles/${articleId}`).as('ArticleDetailesAlias');
		cy.visit(`/articles/${articleId}`);
		cy.wait('@ArticleDetailesAlias');
		cy.getByTestId('ArticleDetailesPage').should('exist');
		// Находим заголовок добавленной статьи
		cy.getByTestId('ArticleDetailesData')
			.getByTestId('Article.Title.Header')
			.should('contain.text', 'Javascript news');
		// По завершению проверок переходим на главную станицу
		cy.visit('/');
	});

	it('Оценка новой статьи', () => {
		// Добавляем новую статью по шаблону
		const articleId = Cypress.env('articles')?.[0].articleId;
		cy.wrap({ articleId }).its('articleId').should('eq', articleId);
		// Переходим на страницу со статьей
		cy.intercept(`/articles/${articleId}`).as('ArticleDetailesAlias');
		cy.visit(`/articles/${articleId}`);
		cy.wait('@ArticleDetailesAlias');
		// Находим заголовок добавленной статьи
		cy.getByTestId('ArticleDetailesData')
			.getByTestId('Article.Title.Header')
			.should('contain.text', 'Javascript news');

		// Ставим оценку 4 и проверяем наличие класса isSelected на звезде
		cy.getByTestId('Article.Rating')
			.should('exist')
			.scrollIntoView({ easing: 'linear' })
			.getByTestId('Article.Rating.Stars.4')
			.as('RatingStar')
			.click();
		cy.get('@RatingStar')
			.invoke('attr', 'class')
			.should('match', / _isSelected_/);
		// Пишем комментарий в форму обратной связи и проверяем наличие нового отзыва
		cy.getByTestId('Rating.FeedBack.Form').getByTestId('Rating.FeedBack.Value').type('Супер отзыв!');
		cy.getByTestId('Rating.FeedBack.Submit.Button').should('be.enabled').click();
		cy.getByTestId('Article.Rating.Frame').getByTestId('Rating.FeedBack.Message').contains('Супер отзыв!');

		// Снимаем оценку и проверяем отсутствие класса isSelected на звезде
		cy.getByTestId('Article.Rating').should('exist').getByTestId('Article.Rating.Stars.4').as('RatingStar').click();
		cy.get('@RatingStar')
			.invoke('attr', 'class')
			.should('not.match', / _isSelected_/);

		// По завершению проверок переходим на главную станицу
		cy.visit('/');
	});

	it('Добавление нового комментария к статье', () => {
		// Добавляем новую статью по шаблону
		const articleId = Cypress.env('articles')?.[0].articleId;
		cy.wrap({ articleId }).its('articleId').should('eq', articleId);
		// Задаем интерцептор для перехвата запроса на переход на страницу со статьей и возвращаем алиас на ожидание завершения загрузки страницы
		cy.intercept(`/articles/+(*)`).as('ArticleDetailesAlias');
		cy.visit(`/articles/${articleId}`);
		cy.wait('@ArticleDetailesAlias', { timeout: 10000 });
		// Проверяем, что количество статей, рекомендованных к просмотру, больше 2
		cy.getByTestId('Article.Recommendation')
			.scrollIntoView({ easing: 'linear' })
			.getByTestId('ArticleItem')
			.its('length')
			.should('be.greaterThan', 2);
		// Проверяем, что к новой статье отсутствуют комментарии
		cy.getByTestId('Article.Comments.Frame').getByTestId('Article.CommentItem').should('not.exist');
		// Вводим новый комментарий
		cy.getByTestId('Article.CommentForm').getByTestId('Article.Comment.Value').type('Новый коммент!');
		cy.getByTestId('Article.CommentForm')
			.getByTestId('Article.Comment.Add.Button')
			.as('AddButton')
			.should('be.enabled');
		cy.get('@AddButton').click();
		// Дожидаемся завершения запроса на добавление коммента
		cy.wait('@PostComment');
		cy.getByTestId('Article.CommentForm').getByTestId('Article.Comment.Add.Button').should('be.disabled');
		// Проверяем, что коммент появился и содержит соответствующий контекст
		cy.getByTestId('Article.Comments.Frame')
			.getByTestId('Article.CommentItem')
			.as('Comment')
			.its('length')
			.should('be.eq', 1);
		cy.get('@Comment').getByTestId('Comment.Content.Message').contains('Новый коммент!');
	});
});
