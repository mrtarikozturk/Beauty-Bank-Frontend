import React from 'react'
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import AppRouter from './router/Router';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppContextProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppRouter />
        </MuiPickersUtilsProvider>
      </AppContextProvider>
    </SnackbarProvider>
  );
}

export default App;
