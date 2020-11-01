import React from 'react';
import './App.css';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {MainRouter} from "./router/MainRouter";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(57, 170, 184)',
            contrastText: '#fff',
        },
    },
});

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>
    </div>
  );
}

export default App;
