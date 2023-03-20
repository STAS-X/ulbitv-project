export type Mods = Record<string, boolean | string | null>;

export function classNames(mainClass: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
	return [mainClass, ...additional, ...Object.keys(mods).map((className) => (mods[className] ? className : ''))]
		.filter(Boolean)
		.join(' ');
}
