export interface FeedbackSchema {
	id: string;
	rating: number;
	feedback: string;
	articleId: string;
	userId: string;
}

export interface ArticleFeedbackSchema {
	feedbacks: FeedbackSchema[];
	isLoading: boolean;
	isError: boolean;
}
