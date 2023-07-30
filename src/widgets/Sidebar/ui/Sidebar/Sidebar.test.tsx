import { fireEvent, screen, waitFor } from '@testing-library/react';
import { SideBar } from './SideBar';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
//import { act } from 'react-dom/test-utils';

describe('button test', () => {
	test('SideBar test with provider HOC', async () => {
		// const SideBarHoc = withTranslation()(SideBar);
		await waitFor(async () => {
			await componentRender(<SideBar />);
		});
		expect(screen.getByTestId('SideBar')).toBeInTheDocument();
	});

	test('SideBar test collapse', async () => {
		// const SideBarHoc = withTranslation()(SideBar);
		await waitFor(async () => {
			await componentRender(<SideBar />);
		});
		const toggleBtn = screen.getByTestId('SideBar-toggle');
		expect(screen.getByTestId('SideBar')).toBeInTheDocument();
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('SideBar')).toHaveClass('collapsed');
		fireEvent.click(toggleBtn);
		expect(screen.getByTestId('SideBar')).not.toHaveClass('collapsed');
	});
});
