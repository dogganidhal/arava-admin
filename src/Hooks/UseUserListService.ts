import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import UserService from "../Data/Service/User/UserService";
import User from "../Data/Model/User";
import ApiException from "../Data/Model/ApiException";

type UseUserListServiceResponse = [boolean, ApiException, User[]];

export default function useUserListService(): UseUserListServiceResponse {
	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [users, setUsers] = useState<User[]>([]);
	const userService = useIoC(UserService);

	useEffect(() => {
		setLoading(true);
		userService.listUsers()
			.then(users => setUsers(users))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [loading, exception, users];
}