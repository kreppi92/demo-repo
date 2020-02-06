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
    src: "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1507"
  }

  componentWillReceiveProps(newProps) {
    const currency = newProps.currency
    let src = ""
    if (currency === "CAD") {
      src = "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1507"
    } else if (currency === "USD") {
      src = "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
    } else {
      src = "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1506"
    }
    
    this.setState({src: src})
  }

  render() {
    const { src } = this.state
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <iframe src={src} width="99%" height="490px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0"></iframe>
      </div>
    )
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(React.memo(Chart))

