import User from "../../Model/User";


export default abstract class UserService {
	abstract listUsers(): Promise<User[]>;
	abstract getUser(id: string): Promise<User>;
}