import React from 'react'
import {
  Redirect, Switch
} from 'react-router-dom'
import { AppRoute, routes } from '../../AppRoutes'

const AppContent = () => {
  return (
    <Switch>
      {routes.map((route, idx) => {
        return (
          <AppRoute
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => (
              <route.component {...props} />
            )} />
        )
      })}
      <Redirect from="/" to="/accounts" />
    </Switch>
  )
}

export default React.memo(AppContent)
