import { unstable_createResource } from './react-cache';

export const ImageResource = unstable_createResource(
	(src: string) =>
		new Promise((resolve) => {
			const img = new Image();
			img.src = src;
			img.onload = resolve;
		})
);
