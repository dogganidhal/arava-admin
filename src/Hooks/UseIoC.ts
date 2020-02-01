import {useContext} from "react";
import {interfaces} from "inversify/dts/interfaces/interfaces";
import ContainerContext from "../Context/ContainerContext";


export default function useIoC<T>(constructor: interfaces.ServiceIdentifier<T>): T {
	const container = useContext(ContainerContext);
	return container.get(constructor)
}