import React from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { mainTheme } from './constants/styles'
import Main from './components/main/Main'
import Terms from './components/main/Terms'

ReactDOM.render((
  <MuiThemeProvider theme={mainTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <Main />} />
        <Route exact path='/terms' component={() => <Terms />} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'))