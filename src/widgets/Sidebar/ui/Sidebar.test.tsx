import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Sidebar } from 'widgets/Sidebar';
import componentRender from '../../../shared/lib/tests/componentRender/componentRender';
//import { act } from 'react-dom/test-utils';

describe('button test', () => {
	test('Sidebar test with provider HOC', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		//await waitFor(async () => {
		await waitFor(() => componentRender(<Sidebar />));

		//});
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('Sidebar test collapse', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		//await waitFor(async () => {
		await waitFor(() => componentRender(<Sidebar />));
		//});
		const toggleBtn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();

		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
	});
});
