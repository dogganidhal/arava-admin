import Mapper from "./index";
import LocalizedResource from "../Model/LocalizedResource";
import LocalizedResourceWriteRequest from "../Model/LocalizedResourceWriteRequest";
import {injectable} from "inversify";


@injectable()
export default class LocalizedResourceMapper implements Mapper<LocalizedResource, LocalizedResourceWriteRequest> {

	public map(object: LocalizedResource): LocalizedResourceWriteRequest {
		return object.reduce((previous, current) => {
			return {
				...previous,
				[current.language.code]: current.resource
			}
		}, {});
	}

}