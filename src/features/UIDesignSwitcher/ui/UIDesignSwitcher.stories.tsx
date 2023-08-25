import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {UIDesignSwitcher} from './UIDesignSwitcher';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'features/UIDesignSwitcher',
	component: UIDesignSwitcher,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof UIDesignSwitcher>;

const Template: StoryFn<typeof UIDesignSwitcher> = (args: any) => <UIDesignSwitcher {...args} />;

export const UIDesignSwitcherNormal = Template.bind({});
UIDesignSwitcherNormal.args = {};
// MainPageNormal.story = {
// 	parameters: getParamsForScreenShot('div.app.light')
// };
UIDesignSwitcherNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const UIDesignSwitcherDark = Template.bind({});
UIDesignSwitcherDark.args = {};
// MainPageDark.story = {
// 	parameters: getParamsForScreenShot('div.app.dark')
// };
UIDesignSwitcherDark.decorators = [ThemeDecorator(Theme.DARK)];
