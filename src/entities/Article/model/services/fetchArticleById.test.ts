import { ArticleSchema } from './../types/articleSchema';
import { ArticleType, ArticleBlockType } from '../types/articleSchema';
/* eslint-disable @typescript-eslint/unbound-method */
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

import { fetchArticleById } from './fetchArticleById';

//jest.mock('axios');
//const mockedAxios = jest.mocked(axios, true);

describe('fetchArticleById selector test', () => {
	const testThunk = new TestAsyncThunk(fetchArticleById);
	const articleParams = { articleId: '1' };
	const articleData: ArticleSchema = {
		id: 1,
		title: 'Javascript news',
		subtitle: 'Что нового в JS за 2022 год?',
		img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
		views: 1022,
		createdAt: '26.02.2022',
		user: { id: '1', username: 'QQQ', profileId: '1' },
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

	// const profileValue = {
	// 	first: 'Станислав',
	// 	lastname: '-XXX-',
	// 	age: 32,
	// 	currency: 'RUB',
	// 	country: 'Russia',
	// 	city: 'Moscow',
	// 	username: 'admin',
	// 	avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
	// };
	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	test('should fulfilled', async () => {
		testThunk.api.get.mockReturnValue(Promise.resolve({ data: articleData }));
		const result = await testThunk.callThunk(articleParams);

		console.log(testThunk.api, 'result data from action');
		//expect(testThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(testThunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toBe(articleData);
	});

	test('should rejected', async () => {
		testThunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testThunk.callThunk({ articleId: '2' });
		//console.log(result.payload, 'payload after empty article')
		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(testThunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
	});
});
