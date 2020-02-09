import "reflect-metadata"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './Components/App';
import {createContainer} from "./Config/Container";
import configureAxios from "./Config/Axios";
import 'font-awesome/css/font-awesome.min.css';
import ContainerContext from "./Context/ContainerContext";
import AuthRequired from "./Components/AuthRequired";
import configureFirebase from "./Config/Firebase";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


configureAxios();
configureFirebase();
const container = createContainer();
const rootComponent = <ContainerContext.Provider value={container}>
	<MuiPickersUtilsProvider utils={MomentUtils} locale={"fr_FR"}>
		<AuthRequired>
			<App />
		</AuthRequired>
	</MuiPickersUtilsProvider>
</ContainerContext.Provider>;

ReactDOM.render(rootComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
