import { StoryFn } from '@storybook/react';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import '@/app/styles/index.scss';
// import i18n (needs to be bundled ;))
import '../../i18n/i18nForTest';

export const StyleDecorator = (story: () => StoryFn) => story();
