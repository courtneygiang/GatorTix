import React, { Suspense, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { actions } from 'slices/app.slice'
import { path } from 'utils/const'
import Fallback from 'components/Fallback'
import Spinner from 'components/Spinner'

const Auth = React.lazy(() => import('./pages/auth'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))
const Profile = React.lazy(() => import('./pages/profile'))
const Buy = React.lazy(() => import('./pages/buy'))
const Sell = React.lazy(() => import('./pages/sell'))

function Router() {
  const dispatch = useDispatch()
  const { checked, loggedIn } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(actions.authenticate())
  }, [])

  if (!checked) {
    return (
      <div className="app-loader-container">
        <Spinner size="4rem" color="white" isLoading />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        {!loggedIn ? (
          <Switch>
            <Route path="/">
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path={path.dashboard}>
              <Dashboard />
            </Route>

            {/* Profile Page Route */}
            <Route path={path.profile}>
              <Profile />
            </Route>

            <Redirect to={path.dashboard} />

            {/* Buy Page Route */}
            <Route path={path.buy}>
              <Buy />
            </Route>

            {/* Sell Page Route */}
            <Route path={path.sell}>
              <Sell />
            </Route>
          </Switch>
        )}
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
