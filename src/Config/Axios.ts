import Axios from "axios";


export default function configureAxios() {
	Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}