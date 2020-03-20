import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { MuiThemeProvider } from '@material-ui/core/styles'
import AppStore from 'stores/app_store/app_store'
import App from 'components/app'
import ApiClient from 'utils/api_client'
import muiTheme from 'styles/mui_theme'
import i18n from './i18n'
import StoreContext from 'contexts/store_context'

const history = createBrowserHistory()

const apiClient = new ApiClient({
  apiToken: process.env.REACT_APP_API_TOKEN,
  apiUrl: process.env.REACT_APP_API_URL
})

const store = AppStore.create({}, { apiClient, i18n: i18n, history })

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <Router history={history}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
