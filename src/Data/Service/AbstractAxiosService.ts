import Axios from "axios";
import ApiException from "../Model/ApiException";
import {injectable} from "inversify";


@injectable()
export default abstract class AbstractAxiosService {

	public async post<T>(uri: string, data: any): Promise<T> {
		try {
			const response = await Axios.post(uri, data);
			return response.data as T;
		} catch (e) {
			throw e.response.data as ApiException;
		}
	}

	public async put<T>(uri: string, data: any): Promise<T> {
		try {
			const response = await Axios.post(uri, data);
			return response.data as T;
		} catch (e) {
			throw e.response.data as ApiException;
		}
	}

	public async get<T>(uri: string): Promise<T> {
		try {
			const response = await Axios.get(uri);
			return response.data as T;
		} catch (e) {
			throw e.response.data as ApiException;
		}
	}

}