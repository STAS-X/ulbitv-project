
type Mods = Record<string, boolean | string>;

export function classNames(mainClass: string, mods? : Mods , additional?: string[] ): string {

    return [
			mainClass,
			...additional,
			...Object.keys(mods).map((className) =>
				mods[className] ? className : ''
			),
		].join(' ');

}