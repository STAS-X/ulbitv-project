describe('Тесты на компонент формы профиля пользователя', () => {
	const changeStatusProfile = (statusSelector: string) => {
		const selector = `[data-testid="${statusSelector}"]`;
		cy.getByTestId('ProfileForm')
			.should('exist', true)
			.getByTestId('ProfileCard.Header')
			.should('exist', true)
			.then(($profileHeader) => {
				if ($profileHeader.find(selector).length > 0) {
					const $statusBtn = $profileHeader.find(selector);
					if (!$statusBtn.is(':disabled')) {
						const button = cy.getByTestId(statusSelector);
						button.click();
					}
				}
			});
	};

	const makeProfileEditable = () => {
		// Переводим форму в редактируемый вид и убеждаемся в наличии кнопки отмены
		changeStatusProfile('ProfileCard.EditBtn.Button');
	};
	const cancelProfileEditable = () => {
		// Отменяем редактирование формы и убеждаемся в налиии кнопки редактирования
		changeStatusProfile('ProfileCard.CancelBtn.Button');
	};
	const saveProfileEditable = () => {
		// Сохрняем изменения в форме профиля
		changeStatusProfile('ProfileCard.SaveBtn.Button');
	};

	beforeEach(function () {
		// Авторизуемся под тестовым пользователем
		cy.logIn().then((userData) => {
			expect(userData).to.have.property('username', 'testuser');
			cy.visit(`/profile/${userData?.profileId}`);

			
			// Should be contain ProfilePage text element
			cy.getByTestId('ProfilePage').contains('Профиль');
			makeProfileEditable();
		});
	});

	afterEach(() => {
		cancelProfileEditable();
		// Выходим из профиля и переходим на главную страницу
		cy.logOut();
	});

	it('Редактируем поле имени пользователя', () => {
		// Вводим новое имя пользователя и проверяем наличие информации
		const nameField = cy.getByTestId('ProfileCard.FirstName.Value');
		nameField.clear().type('Даздраперма');
		nameField.should('contain.value', 'Даздраперма');
	});

	it('Вводим некорректное имя пользователя и ловим ошибку', () => {
		// Вводим некорректное имя пользователя и проверяем наличие информации
		const nameField = cy.getByTestId('ProfileCard.FirstName.Value');
		nameField.clear().should('be.empty');
		const nameValidation = cy.getByTestId('ProfileCard.FirstName.Validation.Message');
		nameValidation.should('exist').contains(/Неверно введено имя*/);
	});

	it('Тестируем поле имя пользователя, изменяем имя, сохраняем в профиль и затем возвращаем в исходное состояние', () => {
		const newName = 'Сашкинс';
		const oldName = 'Sascha';
		const selectorTest = 'ProfileCard.FirstName';
		// Вводим некорректное имя пользователя и проверяем наличие информации
		const profilePage = cy.getByTestId('ProfilePage');
		profilePage.should('exist').within(($page) => {
			let nameField = cy.getByTestId(`${selectorTest}.Value`);
			nameField.should('be.enabled').clear().should('be.empty');
			cy.getByTestId(`${selectorTest}.Validation.Message`).contains(/Неверно введено имя*/);
			nameField.type(newName).should('contain.value', newName);
			cy.getByTestId(`${selectorTest}.Validation.Message`).should('not.exist');
			saveProfileEditable();
			nameField = cy.getByTestId(`${selectorTest}.Value`);
			nameField.should('contain.value', newName);
			makeProfileEditable();
			nameField.clear().type(oldName);
			saveProfileEditable();
			nameField = cy.getByTestId(`${selectorTest}.Value`);
			nameField.should('contain.value', oldName);
		});
	});

	it('Тестируем поле фамилии, вводим новое значение, провеяем на ошибку валидации и отменяем редактиорвание', () => {
		const newSurname = 'Фамилия';
		const selectorTest = 'ProfileCard.LastName';
		// Меняем фамилию пользователя
		const profilePage = cy.getByTestId('ProfilePage');
		profilePage.should('exist').within(($page) => {
			let surnameField = cy.getByTestId(`${selectorTest}.Value`);
			surnameField.should('be.enabled').clear().should('be.empty');
			cy.getByTestId(`${selectorTest}.Validation.Message`).contains(/Неверно введена фамилия*/);
			surnameField.type(newSurname).should('contain.value', newSurname);
			cy.getByTestId(`${selectorTest}.Validation.Message`).should('not.exist');
			cancelProfileEditable();
		});
	});
	it('Тестируем поле возраста вводим новое значение, проверяем на ошибку валидации и отменяем редактиорвание', () => {
		const newAge = '44';
		const selectorTest = 'ProfileCard.Age';
		// Меняем фамилию пользователя
		const profilePage = cy.getByTestId('ProfilePage');
		profilePage.should('exist').within(($page) => {
			let surnameField = cy.getByTestId(`${selectorTest}.Value`);
			surnameField.should('be.enabled').clear().should('be.empty').type('3');
			cy.getByTestId(`${selectorTest}.Validation.Message`).contains(/Неверный возраст*/);
			surnameField.clear().type(newAge).should('contain.value', newAge);
			cy.getByTestId(`${selectorTest}.Validation.Message`).should('not.exist');
			cancelProfileEditable();
		});
	});

	it('Тестирование селекторов выбора страны и валюты на странице ProfilePage', () => {
		const selectorTest = 'ProfileCard.Country';

		cy.checkOptionFromSelect('ProfileCard.Country', 'Armenia').should('contain.text', 'Armenia');
		cy.checkOptionFromSelect('ProfileCard.Country', 'Ukraine').should('contain.text', 'Ukraine');
		cy.checkOptionFromSelect('ProfileCard.Country', 'New Country', false).should('not.contain.text', 'New Country');

		cy.checkOptionFromSelect('ProfileCard.Currency', 'USD').should('contain.text', 'USD');
		cy.checkOptionFromSelect('ProfileCard.Currency', 'EUR').should('contain.text', 'EUR');
		cy.checkOptionFromSelect('ProfileCard.Currency', 'TUGRIK', false).should('not.contain.text', 'TUGRIK');


	})
});
