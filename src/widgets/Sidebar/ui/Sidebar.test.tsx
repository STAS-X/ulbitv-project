import { fireEvent, render, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { Sidebar } from 'widgets/Sidebar';
import componentWithProvider from 'shared/lib/renderTest/componentWithProvider';

describe('button test', () => {
	test('Sidebar test with provider HOC', () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		componentWithProvider(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('Sidebar test collapse', () => {
		// const SideBarHoc = withTranslation()(Sidebar);
		componentWithProvider(<Sidebar />);
		const toggleBtn = screen.getByTestId('sidebar-toggle');
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();

		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
	});
});
