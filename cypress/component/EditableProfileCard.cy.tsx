import { TestComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import '@/app/styles/index.scss';

describe('EditableProfileCard.cy.tsx', () => {
	let profileId = '1';
	beforeEach(() => {
		cy.viewport(700, 700);
		// ✅ RESPOND WITH OBJECT
		cy.fixture('profile.json').then((profile) => {
			profileId = profile.id;
			cy.intercept('GET', `/profiles/${profileId}`, { body: profile }).as('ProfileUser');
			// application requests the /profile/${profileId} resource
			// the intercept replies with the initial object
		});
	});

	it('Test visualize ProfileCard', () => {
		cy.mount(
			<TestComponentRender initialState={{ user: { authData: { userId: '3', profileId: '3' } } }}>
				<EditableProfileCard id={profileId} />
			</TestComponentRender>
		);
		// Проверяем наличие кнопки редактирования и нажимаем ее
		cy.getByTestId('ProfileCard.Header').getByTestId('ProfileCard.EditBtn.Button').should('exist').click();
		// Проверяем наличие кнопки отмены и нажимем ее
		cy.getByTestId('ProfileCard.Header').getByTestId('ProfileCard.CancelBtn.Button').should('exist').click();
		// Проверяем возвращение кнопки редактирования
		cy.getByTestId('ProfileCard.Header').getByTestId('ProfileCard.EditBtn.Button').should('exist');
	});
});
