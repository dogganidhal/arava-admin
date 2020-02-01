import React from 'react';
import {createMuiTheme, ThemeProvider, Typography} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";

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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav>
          <Typography>
            Hello World
          </Typography>
        </Nav>
      </BrowserRouter>
      <div>
        <h4>Arava Admin</h4>
        <p>Circular</p>
      </div>
    </ThemeProvider>
  );
};
