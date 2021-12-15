import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import Login from './containers/Login'
import GlobalStyles from './styles/globalStyles'

ReactDOM.render(
  <React.StrictMode>
    <Login />
    <ToastContainer autoClose={2000} theme="colored" />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root')
)
