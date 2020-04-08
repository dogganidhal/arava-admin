import UserService from "./UserService";
import User from "../../Model/User";
import {injectable} from "inversify";
import AbstractAxiosService from "../AbstractAxiosService";


@injectable()
export default class AxiosUserService extends AbstractAxiosService implements UserService {

	public async listUsers(): Promise<User[]> {
		return await this.get('/user');
	}

	public async getUser(id: string): Promise<User> {
		return await this.get(`/user/${id}`);
	}

}