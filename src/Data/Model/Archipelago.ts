import Island from "./Island";


export default interface Archipelago {
	readonly id: string;
	readonly name: string;
	readonly islands: Island[];
}