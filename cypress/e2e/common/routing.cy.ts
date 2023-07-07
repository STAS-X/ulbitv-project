const USER_LS_KEY = 'user';

describe('Тесты на компонент роутинга', () => {
	const logIn = () => {
		//cy.intercept('POST', '/login', {}).as('getUserData');
		let userId = '';
		cy.request('POST', 'http://localhost:8000/login', { username: 'admin', password: '12345' }).then((response) => {
			//cy.get('@getUserData').should((response) => {
			// response.body is automatically serialized into JSON
			cy.window().then((win) => {
				if (response) {
					const { id, username } = response.body;

					win.localStorage.setItem(USER_LS_KEY, JSON.stringify(response.body ?? ''));
					win.console.log(
						`${username as string} login success`,
						response.status,
						response.statusText,
						'user logIn success'
					);
					userId = id;
				}
			});
		});
		return userId;
	};

	const logOut = () => {
		cy.window().then((win) => {
			const userData: Record<string, string> = !!win.localStorage.getItem(USER_LS_KEY)
				? JSON.parse(win.localStorage.getItem(USER_LS_KEY) as string)
				: {};
			if (userData && 'username' in userData) {
				win.localStorage.setItem(USER_LS_KEY, JSON.stringify(''));
				win.console.log(`${userData.username} user logOut success`);
			}
		});
	};

	const checkClassList = (expectedClasses: string[]) => {
		return ($el: ArrayLike<any>) => {
			//cy.window().then((win) => win.console.warn($el[0].classList, 'get classes from element'));
			const classList: string[] = Array.from($el[0].classList);
			return expectedClasses.every((expectedClass: string) =>
				classList.some((inClass: string) => inClass.startsWith(expectedClass) || inClass.search(expectedClass) > -1)
			);
		};
	};

	const selectorByTestId = (testId: string) => {
		return `[data-testid="${testId}"]`;
	};

	beforeEach(() => {
		logOut();
	});

	it('Переход на главную страницу проекта MainPage', () => {
		cy.visit('/');
		// Should be contain Main text element
		cy.get(selectorByTestId('MainPage')).contains('Главная');
		// Should be in URL include
		cy.url().should('include', '/');
	});

	it('Переход на страницу О проекте AboutPage', () => {
		cy.visit('/about');
		// Should be contain About text element
		cy.get(selectorByTestId('AboutPage')).contains('О сайте');
		// Should be in URL include
		cy.url().should('include', 'about');
	});

	it('Переход на страницу проекта без авторизации ProfilePage', () => {
		cy.visit('/profile');
		// Без авторизации будет произведен редирект на страницу NotFound
		// Should be contain NotFound text element
		cy.get(selectorByTestId('NotFoundPage')).contains(`Страница 'profile' не найдена`);
		// Should be in URL include
		cy.url().should('include', 'profile');
	});

	it('Переход на страницу проекта с авторизацией ProfilePage', () => {
		// Авторизуемся для входа в профиль
		const userId = logIn() || '1';
		cy.visit(`/profile/${userId}`);
		// Без авторизации будет произведен редирект на страницу NotFound
		// Should be contain NotFound text element
		cy.get('[data-testid=ProfilePage]').contains('Профиль');
		let editBtn = cy.get(selectorByTestId('ProfileCard.EditBtn'));
		editBtn.contains('Редактировать');
		editBtn.click();
		const cancelBtn = cy.get(selectorByTestId('ProfileCard.CancelBtn'));
		cancelBtn.should('exist', true);
		cancelBtn.click();
		editBtn = cy.get(selectorByTestId('ProfileCard.EditBtn'));
		editBtn.should('exist', true);
		editBtn.should('have.css', 'color', 'rgb(17, 88, 253)');
		editBtn.should('satisfy', checkClassList(['_button_*', '_editbtn_*']));
		// Should be in URL include
		cy.url().should('include', `profile/${userId}`);
	});

	it('Переход на страницу проекта со списком статей ArticlesPage', () => {
		// Авторизуемся для входа в профиль
		logIn();
		// Переходим на страницу статей
		cy.visit('/articles');
		// Should be contain ArticlesPage text element
		cy.get(selectorByTestId('ArticlesPage')).should('exist');
		// Should be in URL include
		cy.url().should('include', 'articles');
	});

	it('Переход на страницу проекта со статьей 1 ArticlePage', () => {
		// Авторизуемся для входа в профиль
		logIn();
		// Переходим на страницу статьи 1
		cy.visit('/articles/1');
		// Should be contain ArticleDetailesPage text element
		cy.get(selectorByTestId('ArticleDetailesPage')).should('exist');
		// Should be in URL include
		cy.url().should('include', 'articles/1');
	});
});

export {};
