import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CodeProps, Code } from './Code';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Code',
	component: Code,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = (args: CodeProps) => <Code {...args} />;

export const CodePrimary = Template.bind({});
CodePrimary.args = {
	children: `export default {\n"title:'shared/Code',\n"component: Code,\nargTypes: {\n"	backgroundColor: { control: 'color' }\n"}\n} as Meta<typeof Code>;`
};

export const CodeSecondary = Template.bind({});
CodeSecondary.args = {
	children: 'Text secondary'
};

export const CodeSecondaryDark = Template.bind({});
CodeSecondaryDark.args = {
	children: 'Text secondary'
};
CodeSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
