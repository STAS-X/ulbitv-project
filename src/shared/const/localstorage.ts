export { default as PLACEHOLDER_IMAGE } from '@/shared/assets/images/placeholder.jpg';
export { default as PLACEHOLDER_AVATAR } from '@/shared/assets/images/avatar.jpg';

export const AVATAR_REDESIGN = _DEV_MODE_ ? '/src/shared/assets/icons/avatar.svg' : './shared/assrts/icons/avatar.svg';

export const USER_LS_KEY = 'user';
export const FEATURES_LS_KEY = 'features';
export const LOCAL_STORAGE_THEME_KEY = 'theme';
export const NOTIFY_LS_KEY = 'notifications';
export const PROFILE_KEY = 'profile';
export const ARTICLE_VIEW = 'view';
export const ARTICLE_SORT = 'sort';
export const ARTICLE_FILTER = 'filter';
export const ARTICLE_CATEGORY = 'category';
export const ARTICLE_SELECTORS = 'selectors';
export const DIV_SCROLL_SELECTOR = 'div.infiniteLoaderContainer';
export const ARTICLE_ITEM_SELECTOR = 'div.article_list_item';
export const DEBOUNCE_DELAY = 500;
export const LIST_ARTICLE_HEIGHT = 650;
export const TILE_ARTICLE_WIDTH = 250;
export const TILE_ARTICLE_HEIGTH = 300;
export const LIST_SCELETON_HEIGTH = 360;

export type SelectorType = 'view' | 'sortOrder' | 'sortField' | 'filter' | 'category';
