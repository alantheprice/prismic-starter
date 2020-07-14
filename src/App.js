import React from 'react'
import { Helmet } from 'react-helmet'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { repoName } from './prismic-configuration'
import { Help, Preview, NotFound, Page } from './pages'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

/**
 * Main application component
 */
const App = (props) => (
  <div className="main">

    <Helmet>
      <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
    </Helmet>
    <BrowserRouter>

      <div className="header">
        <Header {...props} />
      </div>
      <div className="sidebar">
        <Sidebar {...props} />
      </div>
      <div className="content">
        <Switch>
          <Redirect exact from='/' to='/hello-world' />
          <Route exact path='/help' component={Help} />
          <Route exact path='/preview' component={Preview} />
          <Route exact path='/:uid' component={Page} />
          <Route component={NotFound} />
        </Switch>

      </div>
    </BrowserRouter>
  </div>
)

export default App
