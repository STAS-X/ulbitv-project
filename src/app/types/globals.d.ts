// declaration.d.ts

declare module '*.png';
declare module '*.jpeg';
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

declare const _DEV_MODE_: boolean;
declare const _BASE_URL_: string;
