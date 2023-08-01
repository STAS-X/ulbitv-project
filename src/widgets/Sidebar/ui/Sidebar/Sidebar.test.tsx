import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
//import { act } from 'react-dom/test-utils';

describe('button test', () => {
	test('Sidebar test with provider HOC', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		await waitFor(async () => {
			await componentRender(<Sidebar />);
		});
		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
	});

	test('Sidebar test collapse', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		await waitFor(async () => {
			await componentRender(<Sidebar />);
		});
		const toggleBtn = screen.getByTestId('Sidebar-toggle');
		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('Sidebar')).toHaveClass('collapsed');
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('Sidebar')).not.toHaveClass('collapsed');
	});
});
