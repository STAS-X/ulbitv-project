import { lazy } from 'react';

const MainPageLazy = lazy(() => new Promise(resolve=> {

    setTimeout(() => resolve(import('./MainPage') as never),1000);
}));

export default MainPageLazy;