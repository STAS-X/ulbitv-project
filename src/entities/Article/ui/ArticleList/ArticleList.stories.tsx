import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleListProps, ArticleList } from './ArticleList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType, ArticleSchema, ArticleType, ArticleView } from '../../model/types/articleSchema';

const article = {
	id: 1,
	title: 'Javascript news',
	subtitle: 'Что нового в JS за 2022 год?',
	img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
	views: 1022,
	createdAt: '26.02.2022',
	user: {
		id: '1',
		username: '-XXX-',
		avatar:
			'https://bipbap.ru/wp-content/uploads/2021/07/unikal-nye-kartinki-na-avu-vk-i-odnoklassniki-samye-krasivye-2.jpg',
		profileId: '1'
	},
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
};

export default {
	title: 'entities/Article/ArticleList',
	component: ArticleList,
	args: {
		articles: Array.from({ length: 20 }, (_, index) => {
			return { ...article, id: index + 1 } as ArticleSchema;
		})
	}
} as Meta<typeof ArticleList>;

const Template: StoryFn<typeof ArticleList> = (args: ArticleListProps) => <ArticleList {...args} />;

export const ArticleListEmpty = Template.bind({});
ArticleListEmpty.args = {
	children: 'Text primary',
	articles: []
};

export const ArticleListTile = Template.bind({});
ArticleListTile.args = {
	children: 'Text primary',
	view: ArticleView.TILE
};

export const ArticleListLoading = Template.bind({});
ArticleListLoading.args = {
	children: 'Text primary',
	isLoading: true
};

export const ArticleListListDark = Template.bind({});
ArticleListListDark.args = {
	children: 'Text secondary'
};
ArticleListListDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ArticleListTileDark = Template.bind({});
ArticleListTileDark.args = {
	children: 'Text secondary',
	view: ArticleView.TILE
};
ArticleListTileDark.decorators = [ThemeDecorator(Theme.DARK)];
