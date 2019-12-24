// React
import React, { Component } from 'react'

// Prop Types
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'

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

class Landing extends Component {
  state = {
  }

  render() {
    const { classes } = this.props
    
    return (
      <div className={classes.container}> 
      </div>
    )
  } 
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)