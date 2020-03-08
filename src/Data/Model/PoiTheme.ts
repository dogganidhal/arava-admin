import LocalizedResource from "./LocalizedResource";
import Media from "./Media";


export default interface PoiTheme {
	readonly id: string;
	readonly name: LocalizedResource;
	readonly icon?: Media;
	readonly parent?: PoiTheme;
	readonly subThemes?: PoiTheme[];
}

export function extractThemeNameWithParent (theme: PoiTheme): string {
	const extractThemeName = (theme: PoiTheme) => theme.name
		.find(r => r.language.code === 'fr')
		?.resource ?? "";
	let themeName = extractThemeName(theme);

	let parent: PoiTheme | undefined = theme.parent;
	if (parent) {
		themeName = `${themeName} (${extractThemeName(parent)})`;
	}
	return themeName;
}