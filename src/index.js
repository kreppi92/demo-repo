import React from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { mainTheme } from './constants/styles'
import Main from './components/main/Main'
import Signup from './components/main/Signup'
import ForgotPassword from './components/main/ForgotPassword'
import Terms from './components/main/Terms'
import NavigationBar from './components/main/NavigationBar'

ReactDOM.render((
  <MuiThemeProvider theme={mainTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <Main />} />
        <Route exact path='/create_account' component={() => <Signup />} />
        <Route exact path='/forgot_password' component={() => <ForgotPassword />} />
        <Route exact path='/terms' component={() => <Terms />} />
        <Route exact path='/home' component={() => <NavigationBar />} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'))