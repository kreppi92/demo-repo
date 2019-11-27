// React
import React, { Component } from 'react'

// Prop Types
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'

// Local
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
  }

  render() {
    const { classes } = this.props
    
    return (
      <div>
        <Signin />
      </div>
    )
  } 
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)