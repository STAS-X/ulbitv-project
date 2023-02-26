import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import componentWithProvider from 'shared/lib/renderTest/componentWithProvider';
import { act } from 'react-dom/test-utils';

describe('button test', () => {
	test('Sidebar test with provider HOC', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		await act(async () => {
			componentWithProvider(<Sidebar />);
		});
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('Sidebar test collapse', async () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		await act(async () => {
			componentWithProvider(<Sidebar />);
		});
		const toggleBtn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();

		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
	});
});
