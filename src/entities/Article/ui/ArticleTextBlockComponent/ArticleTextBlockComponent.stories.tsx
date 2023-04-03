import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleTextBlockComponentProps, ArticleTextBlockComponent } from './ArticleTextBlockComponent';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { ArticleBlockType } from '../../model/types/articleSchema';

export default {
	title: 'shared/ArticleTextBlockComponent',
	component: ArticleTextBlockComponent,
	args: {
		block: {
			id: '7',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
			]
		}
	}
} as ComponentMeta<typeof ArticleTextBlockComponent>;

const Template: ComponentStory<typeof ArticleTextBlockComponent> = (args: ArticleTextBlockComponentProps) => (
	<ArticleTextBlockComponent {...args} />
);

export const ArticleTextBlockComponentPrimary = Template.bind({});
ArticleTextBlockComponentPrimary.args = {
	children: 'Text primary'
};

export const ArticleTextBlockComponentDark = Template.bind({});
ArticleTextBlockComponentDark.args = {
	children: 'Text secondary'
};
ArticleTextBlockComponentDark.decorators = [ThemeDecorator(Theme.DARK)];
