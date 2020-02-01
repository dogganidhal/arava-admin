import {useContext} from "react";
import ContainerContext from "../Config/Container";
import {interfaces} from "inversify/dts/interfaces/interfaces";


export default function useIoC<T>(constructor: interfaces.Newable<T>): T {
	const container = useContext(ContainerContext);
	return container.resolve(constructor)
}