import React, {useContext, useEffect} from 'react';
import {createMuiTheme, ThemeProvider, Typography} from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./Nav";
import NavigationConfig from "../Config/Navigation";
import useAuth from "../Hooks/UseAuth";
import Login from "./Login";
import AppLoader from "./AppLoader";
import AuthContext from "../Context/AuthContext";
import AccessDenied from "./AccessDenied";

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
  const {authenticated, isAdmin} = useContext(AuthContext);

  useEffect(() => loadAuth(), []);

  return <ThemeProvider theme={theme}>
    {
      isLoading && <AppLoader />
    }
    {
      authenticated ?
        <BrowserRouter>
          <Nav>
            <Switch>
              <Route path={"/"} exact>
                <Redirect to={"/pois"} />
              </Route>
              {
                NavigationConfig.routes.map((route, index) => (
                  (!route.adminOnly || isAdmin) ?
                    <Route key={index} path={route.path} exact={route.exact}>
                      {route.component}
                    </Route> :
                    <AccessDenied />
                ))
              }
            </Switch>
          </Nav>
        </BrowserRouter> :
        <Login />
    }
  </ThemeProvider>;
};
