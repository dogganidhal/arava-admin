import Language from "./Language";


interface LocalizedString {
	readonly resource: string;
	readonly language: Language;
}

type LocalizedResource = LocalizedString[];

export default LocalizedResource;