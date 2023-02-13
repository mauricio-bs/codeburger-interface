import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import paths from '../constants/paths'
import { Home, Products, Register, Login, Cart, Admin } from '../containers'
import PrivateRoute from './private-routes'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path={paths.Login} />
        <Route component={Register} path={paths.Register} />
        <PrivateRoute exact component={Home} path={paths.Home} />
        <PrivateRoute component={Products} path={paths.ClientProducts} />
        <PrivateRoute component={Cart} path={paths.Cart} />

        <PrivateRoute component={Admin} path={paths.Order} isAdmin />
        <PrivateRoute component={Admin} path={paths.Products} isAdmin />
        <PrivateRoute component={Admin} path={paths.NewProduct} isAdmin />
      </Switch>
    </Router>
  )
}

export default Routes
