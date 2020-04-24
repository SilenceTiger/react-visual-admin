import React, { Fragment } from "react"
import { Route as ReactRoute, Switch } from "react-router-dom"
import modules from "../modules"

const getAllRoutes = (mods) => {
  const _allRoutes = []
  mods.forEach((mod) => {
    _allRoutes.push(...mod.routes)
  })
  return _allRoutes
}

const PrimaryContent = () => {
  const allRoutes = getAllRoutes(modules)
  return (
    <Switch>
      <Fragment>
        {allRoutes.map((route) => {
          let PageComponent = route.component
          return (
            <ReactRoute
              exact
              key={route.path}
              path={route.path}
              render={(routeprops) => <PageComponent {...routeprops} />}
            />
          )
        })}
      </Fragment>
    </Switch>
  )
}

export default PrimaryContent
