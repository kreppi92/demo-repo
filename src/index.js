import React from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { mainTheme } from './constants/styles'
import Signin from './components/main/Signin'
import Signup from './components/main/Signup'
import ForgotPassword from './components/main/ForgotPassword'
import Terms from './components/main/Terms'
import Home from './components/main/Home'
import Landing from './components/main/Landing'

ReactDOM.render((
  <MuiThemeProvider theme={mainTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <Landing />} />
        <Route exact path='/signin' component={() => <Signin />} />
        <Route exact path='/create_account' component={() => <Signup />} />
        <Route exact path='/forgot_password' component={() => <ForgotPassword />} />
        <Route exact path='/terms' component={() => <Terms />} />
        <Route exact path='/home' component={() => <Home />} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'))