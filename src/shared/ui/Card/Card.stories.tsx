import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CardProps, Card } from './Card';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Text } from '../Text/Text';

export default {
	title: 'shared/Card',
	component: Card,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args: CardProps) => <Card {...args} />;

export const CardNormal = Template.bind({});
CardNormal.args = {
	children: <Text title={'Title light'} content={'Content light'} />
};

export const CardDark = Template.bind({});
CardDark.args = {
	children: <Text title={'Title dark'} content={'Content dark'} />
};
CardDark.decorators = [ThemeDecorator(Theme.DARK)];
