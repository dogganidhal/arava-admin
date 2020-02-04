import React, {useContext, useEffect} from 'react';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Nav";
import NavigationConfig from "../Config/NavigationConfig";
import useAuth from "../Hooks/UseAuth";
import Login from "./Login";
import AppLoader from "./AppLoader";
import AuthContext from "../Context/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#087E8B"
    }
  },
  typography: {
    fontFamily: [
      'Circular Std',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
});


export default function App() {
  const {isLoading, loadAuth} = useAuth();
  const {authenticated} = useContext(AuthContext);

  useEffect(() => loadAuth(), []);

  return <ThemeProvider theme={theme}>
    {
      isLoading && <AppLoader />
    }
    {
      authenticated ?
        <BrowserRouter>
          <Nav>
            {
              NavigationConfig.routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact}>
                  {route.component}
                </Route>
              ))
            }
          </Nav>
        </BrowserRouter> :
        <Login />
    }
  </ThemeProvider>;
};
