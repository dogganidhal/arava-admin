import React, {useCallback} from "react";
import MUIDataTable, {MUIDataTableColumnDef} from "mui-datatables";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {IconButton, TableCell, TableRow} from "@material-ui/core";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {Link} from "react-router-dom";
import useUserListService from "../Hooks/UseUserListService";


const columns: MUIDataTableColumnDef[] = [
	{
		name: 'Nom',
		options: {
			filter: true
		}
	},
	{
		name: "Prénom",
		options: {
			filter: true
		}
	},
	{
		name: "email",
		options: {
			filter: true
		}
	},
	{
		name: "Actions",
		options: {
			sort: false,
			filter: false
		}
	},
];

export default function UserList() {
	const [loading, exception, users] = useUserListService();

	const mapCommentsToTableData = useCallback(() => users.map((user, _) => {
		return [
			user.lastName,
			user.firstName,
			user.email,
			user.id
		];
	}), [users]);

	if (loading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <MUIDataTable
		title={"Liste des utilisateurs"}
		columns={columns}
		data={mapCommentsToTableData()}
		options={{
			filter: false,
			elevation: 0,
			selectableRows: "none",
			customRowRender: (data: any[]) => {
				return <TableRow>
					{
						[0, 1, 2].map(dataIndex => <TableCell>
							{data[dataIndex]}
						</TableCell>)
					}
					<TableCell>
						<IconButton
							color={"primary"}
							component={Link}
							to={`/users/${data[3]}`}
						>
							<OpenInNewIcon />
						</IconButton>
					</TableCell>
				</TableRow>;
			}
		}}
	/>
}