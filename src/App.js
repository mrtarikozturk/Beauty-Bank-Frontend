import React, { useContext } from 'react'
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { IntlProvider } from 'react-intl';

import AppRouter from './router/Router';

import messages_en from './locales/en.json';
import messages_nl from './locales/nl.json';
import { AppContext } from './context/AppContext'

const messages = {
  en: messages_en,
  nl: messages_nl,
}

function App() {

  const { lang } = useContext(AppContext);

  return (
    <IntlProvider messages={messages[lang]} locale={lang} defaultLocale='nl'>
      <SnackbarProvider maxSnack={3}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppRouter />
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </IntlProvider>
  );
}

export default App;
