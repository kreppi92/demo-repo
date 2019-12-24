import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

class Chart extends Component {
  state = {
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1507" width="99%" height="490px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0"></iframe>
      </div>
    )
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chart)
