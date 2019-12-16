// React
import React, { Component } from 'react'

// Prop Types
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'

// Local
import Navigation from './NavigationBar'
import Signin from './Signin'

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
}

class Main extends Component {
  state = {
    isSignedIn: false
  }

  completedSignIn = () => {
    this.setState({ isSignedIn: true})
  }

  render() {
    const { classes } = this.props
    const { isSignedIn } = this.state
    
    return (
      <div>
        {
          isSignedIn ? <Navigation /> : <Signin completedSignIn={this.completedSignIn}/>
        }
      </div>
    )
  } 
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)