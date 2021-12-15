import PropTypes from 'prop-types'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default async function PrivateRoute({ element, ...rest }) {
  const user = await localStorage.getItem('codeburger:userData')

  if (!user) {
    return <Redirect to="/login" />
  }

  return <Route element={element} {...rest} />
}

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}
