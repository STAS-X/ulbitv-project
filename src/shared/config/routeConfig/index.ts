import { PathRouteProps } from 'react-router-dom';
import { UserRoleType } from '@/entities/User/model/types/userSchema';

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLE_DETAILES = 'article_detailes',
	ARTICLE_CREATE = 'article_create',
	ARTICLE_EDIT = 'article_edit',
	ADMIN_PANEL = 'adminka',
	NOT_FOUND = 'not_found',
	FORBIDDEN = 'forbidden'
}

export interface AuthRouteProps extends PathRouteProps {
	isAuth?: boolean;
	pathname: string;
	roles?: UserRoleType[];
	Element: React.FC;
}
