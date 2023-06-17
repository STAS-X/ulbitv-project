import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ArticleDetailesPage, { ArticleDetailesPageProps } from './ArticleDetailesPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleBlockType, ArticleType } from '@/entities/Article';

export default {
	title: 'pages/ArticleDetailesPage',
	component: ArticleDetailesPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticleDetailesPage>;

const Template: StoryFn<typeof ArticleDetailesPage> = (args: ArticleDetailesPageProps) => (
	<ArticleDetailesPage {...args} />
);

const extraReducers = {
	articleDetailesPage: {
		comments: {
			isLoading: false,
			ids: ['1', '2'],
			entities: {
				'1': {
					id: '1',
					text: 'some comment four',
					user: { id: '1', username: 'User1', profileId: '1', avatar: '' }
				},
				'2': {
					id: '2',
					text: 'some comment five',
					user: { id: '2', username: 'User2', profileId: '2', avatar: '' }
				}
			}
		},
		recommendations: {
			isLoading: false,
			ids: ['2', '3'],
			entities: {
				'2': {
					id: 2,
					title: 'Python news',
					subtitle: 'Что нового в Python за 2020 год?',
					img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
					views: 822,
					createdAt: '26.02.2020',
					user: { id: '1', username: 'QWERTY', profileId: '1' },
					type: [ArticleType.IT],
					blocks: []
				},
				'3': {
					id: 3,
					title: 'Basic.Net news',
					subtitle: 'Что нового в Basic.Net за 2023 год?',
					img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
					views: 922,
					createdAt: '21.09.2022',
					user: { id: '1', username: 'QWERTY', profileId: '1' },
					type: [ArticleType.IT],
					blocks: []
				}
			}
		}
	}
};

export const ArticleDetailesPageWithStoreDark = Template.bind({});
ArticleDetailesPageWithStoreDark.args = {};
ArticleDetailesPageWithStoreDark.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({
		...extraReducers,
		articleDetailes: {
			isLoading: false,
			data: {
				id: 1,
				title: 'Javascript news',
				subtitle: 'Что нового в JS за 2022 год?',
				img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
				views: 1022,
				createdAt: '26.02.2022',
				user: { id: '1', username: 'QWERTY', profileId: '1' },
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
						code: `const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);`
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
			}
		}
	})
];

export const ArticleDetailesPageLoading = Template.bind({});
ArticleDetailesPageLoading.args = {};
ArticleDetailesPageLoading.decorators = [
	ThemeDecorator(Theme.LIGHT),
	StoreDecorator({
		articleDetailes: {
			isLoading: true
		}
	})
];

export const ArticleDetailesPageError = Template.bind({});
ArticleDetailesPageError.args = {};
ArticleDetailesPageError.decorators = [
	ThemeDecorator(Theme.LIGHT),
	StoreDecorator({
		articleDetailes: {
			isLoading: false,
			error: 'Error fetch article'
		}
	})
];
