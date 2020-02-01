import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './Components/App';
import ContainerContext, {createContainer} from "./Config/Container";
import configureAxios from "./Config/Axios";
import 'font-awesome/css/font-awesome.min.css';

const container = createContainer();
configureAxios();

ReactDOM.render(<ContainerContext.Provider value={container}>
	<App />
</ContainerContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
