import { Story } from '@storybook/react';
import '@/app/styles/index.scss';
// import i18n (needs to be bundled ;))
import '../../i18n/i18nForTest';

export const StyleDecorator = (story: () => Story) => story();
