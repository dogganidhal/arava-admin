import Axios from "axios";


export default abstract class AbstractAxiosService {

	public async post<T>(uri: string, data: any): Promise<T> {
		const response = await Axios.post<T>(uri, data);
		if (response.status >= 400) {
			// TODO: Handle errors
		}
		return response.data;
	}

}