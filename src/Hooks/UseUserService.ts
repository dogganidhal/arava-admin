import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import UserService from "../Data/Service/User/UserService";
import User from "../Data/Model/User";
import ApiException from "../Data/Model/ApiException";

type UseUserServiceResponse = [boolean, ApiException, User];

export default function useUserService(id: string): UseUserServiceResponse {
	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [user, setUser] = useState();
	const userService = useIoC(UserService);

	useEffect(() => {
		setLoading(true);
		userService.getUser(id)
			.then(user => setUser(user))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [loading, exception, user];
}