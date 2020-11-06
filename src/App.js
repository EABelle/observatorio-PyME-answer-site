import React from 'react';
import './App.css';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

import {MainRouter} from "./router/MainRouter";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(57, 170, 184)',
            contrastText: '#fff',
        },
    },
}, esES);

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
