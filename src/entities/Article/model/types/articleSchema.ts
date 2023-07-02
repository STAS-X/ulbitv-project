import { UserData } from './../../../User/model/types/userSchema';

export interface ArticleBaseCodeBlock {
	id: string;
	type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBaseCodeBlock {
	type: ArticleBlockType.CODE;
	code: string;
}
export interface ArticleImageBlock extends ArticleBaseCodeBlock {
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
}
export interface ArticleTextBlock extends ArticleBaseCodeBlock {
	type: ArticleBlockType.TEXT;
	title?: string;
	paragraphs: Array<string>;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleBlockType {
	CODE = 'CODE',
	IMAGE = 'IMAGE',
	TEXT = 'TEXT'
}

export enum ArticleType {
	IT = 'IT',
	SCIENCE = 'SCIENCE',
	ECONOMICS = 'ECONOMICS'
}

export interface ArticleSchema {
	id: number;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	user: UserData;
	type: Array<ArticleType>;
	blocks: Array<ArticleBlock>;
}
