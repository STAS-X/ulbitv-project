## Общие сведения

Проект написан в процессе прохождения авторского курса [`Продвинутый Frontend. В production на React`](https://ulbitv.ru/frontend)
Деплой frontend выполнен на базе сервиса Netlify, фейковый сервер (json-server) развернут на базе Vercel. Проект доступен по [ссылке](https://articles-project.netlify.app/)
Для авторизации доступны следующие пользователи (логин/пароль): `admin`/12345 `user`/123321 `testuser`/123
Каждый пользователь наделен определенной ролью и возможностями, в зависимости от которых доступны те или иные страницы/сервисы, а также становятся доступны или отображаются дополнительные компоненты или оповещения. Пользователь `admin` обладает самыми широкими полномочиями. Из-за особенностей деплоя серверной части при попытке обновить данные профиля пользователя, смены RedesignUI (переключение между старым и новыми стилями) обновление информации происходит после обновления страницы, а в ответе от сервера происходит возврат ошибки (хотя ее там быть не должно).

В проекте реализованы следующие возможности: работа с темами, интернационализация (мультиязычность), редезайн компонентов с автоматическим изменением контента в зависимости от роли и возможностей пользователя, ленивая и динамическая подгрузка компонентов и библиотек по принципу концепции code splitting (только там где это нужно), показ лодеров и скелетонов во время загрузки контента, роутинг и авторизация (некоторые разделы становятся доступны только после авторизации), адаптация интерфейса под мобильные устройства (сообщения для пользователя на мобильном устройстве открываются в виде выезжающей шторки).

Архитектура проекта базируется на принципах FSD (feature slice design). Многие компоненты дополнены описанием unit тестов и описанием дизайна в storybook. Также в проекте присутствуют интеграционные тесты на базе cypress.

Работа с хранилищем (store) осуществляется с использованием Redux. 
Фактически каждая сущность обладает отдельным набором независимых редюсеров (createSlice). Для изменения данных на сервере используются либо asyncThunk, либо RTK ToolKit (Query+Mutation). Отслеживание изменения данных в сторе происходит благодаря стандартным useSelector, так и на базе мемоизированных селекторов createSelector (если речь идет об объектах, например, статьи, комментарии и иные сущности).

Данный проект предназначен для просмотра статей из разных областей (айти, финансы, наука). Для каждой статьи доступна возможность добавить/удалить (только для администратора) комментарий, оценить статью и добавить отзыв. Каждая статья состоит из стандартного набора блоков (текстовый, кодовый, изображение). Возможно переключение вида отображения лист/плитка, сортировка (по полям) и фильтрация по тематике. Подгрузка статей осуществляется постранично, причем создание дополнительных domNode происходит динамически в зависимости от нахождения той или иной статью в зоне отображения (viewport) на базе компонента InfiniteLoader библиотеки react-window-infinite-loader. Редактирование и создание новой статьи также пока не доступно.

Проект позволяет пользователю зарегистрироваться (после ввода логина и пароля), после чего открываются максимальные возможности, в зависимости от роли пользователя. Страницы `Главная` и `О проекте` пока не заполнены, на странице `Профиля` можно менять/редактировать персональные данные, включая путь к аватарке. Страица `Статьи` позволяет просматривать в режиме пейджинга доступные статьи, переключать вид отображения. Для краткого вида статей на карточке отображается информация о количестве просмотров, название тематики, авторе статьи, дате ее создания и краткая информация о содержании. При клике на кнопку `Читать далее` автоматически открывается новая вкладка с детальными сведениями о статье, появляется возможность добавления и удаления комментариев, оценки статьи и добавления отзыва. После статьи присутствует список рекомендаций для просмотра. Страница `Настройки` позволяет изменить стиль отображения компонентов между "старым" и "новым" (переключение происходит после принудительного обновления страницы).
Структурно в левой части экрана находится виджет NavBar (ссылки на страницы проекта в зависимости от статуса авторизации пользователя) для осуществления переключения между страницами проекта. Вверху находится виждет SideBar (сообщения пользователя - нотификация + меню для авторизации и быстрого перемещения между страницами), содержащий контектсное меню и фичу для отображения нотификаций. В централной части экрана располагается контентная часть проекта, в зависимости от текущей открытой страницы. В правой части экрана находится всплывающий ToolBar, в текущем проекте в нем реализована кнопка быстрого перехода вверх страницы (доступна для страницы статей и детального отображения статьи). При попытке перехода на несуществующую страницу или возникновении глобальной ошибки (например, отсутствие авторизации) пользователю отображается страница с ошибкой и пояснениями причин ее возникновения. 

```
Желаю приятного просмотра и спасибо за проявленный к проекту интерес!
```

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Хапуск unit тестов с jest
- `npm run test:ui` - Хапуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 4 вида тестов:
1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) Скриншотное тестирование с loki `npm run test:ui`
4) e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

----

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin *eslint-plugin-ulbi-tv-plugin*,
который содержит 3 правила
1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

----
## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:
- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config
- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.
(убрал loki скриншотные тесты по причине некорректной работы в режиме loki:chrome со storybook v7 в процедуре CI)

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky
(не включал автозапуски husky, так как работает CI pipeline github/workflows)

----

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Common](/src/entities/Common)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фичи (features)

- [AddCommentForm](/src/features/AddCommentForm)
- [AddMenuButton](/src/features/AddMenuButton)
- [AddNotification](/src/features/AddNotification)
- [ArticleCategorySelector](/src/features/ArticleSelectors/ui/ArticleCategorySelector)
- [ArticleSearchSelector](/src/features/ArticleSelectors/ui/ArticleSearchSelector)
- [ArticleSortSelector](/src/features/ArticleSelectors/ui/ArticleSortSelector)
- [ArticleViewSelector](/src/features/ArticleSelectors/ui/ArticleViewSelector)
- [EditArticleForm](/src/features/EditArticleForm)
- [AddArticleRating](/src/features/AddArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [LanguageSwitcher](/src/features/LanguageSwitcher)
- [ThemeSwitcher](/src/features/ThemeSwitcher)

