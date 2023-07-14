import { ArticleSchema } from "../../../src/entities/Article/model/types/articleSchema";

const addNewArticle = <T extends Cypress.RequestBody>(body: T) => {
	return cy.request({
		method: 'POST', url: 'http://localhost:8000/articles',
		body,
		headers: {
			Authorization: 'test'
		}
	}).then((response) => {
		const articleId = response.body.id;
		Cypress.env('articles').push({ articleId });
		//console.log(Cypress.env('articles')?.[0].articleId, 'new article id after addNew');
		return response;
	});

}

const deleteArticleById = (id: string | number) => {
	return cy.request({
		method: 'DELETE',
		url: `http://localhost:8000/articles/${id}`,
		headers: {
			Authorization: 'test'
		}
	}).then((response) => {
		const articleId = response.body.id;
		Cypress.env('articles', { articles: Cypress.env('articles').filter((article) => article.articleId !== articleId) });
		return response;
	});

};

export { addNewArticle, deleteArticleById };
