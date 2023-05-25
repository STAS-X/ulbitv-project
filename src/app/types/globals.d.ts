// declaration.d.ts

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';

declare module '*.svg' {
	import React from 'react';

	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.module.scss' {
	const classes: Record<string, string>;
	export default classes;
}

declare module '*.css' {
	const classes: Record<string, string>;
	export default classes;
}

declare module 'storybook-addon-mock';

declare const _DEV_MODE_: boolean;
declare const _BASE_URL_: string;
declare const _PROJECT_: string;

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
