
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../constants/styles'

// Styles
const styles = ({
  body: {
    fontSize: '17px',
    lineHeight: '24px',
    fontWeight: 500,
    textAlign: 'left',
    letterSpacing: 0.3,
  },

  boldText: {
    fontWeight: 700,
  },

  container: {
    background: palette.white[0],
    display: 'flex',
    flexDirection: 'column',
    margin: '50px 190px 50px 190px',

    '@media (max-width: 1024px)': {
      margin: '50px 50px 50px 50px',
    },

    '@media (max-width: 479px)': {
      margin: '50px 25px 20px 25px',
    },
  },

  contentTitle: {
    color: palette.black[0],
    fontWeight: 700,
    fontSize: '25px',
    textAlign: 'center',
    letterSpacing: 0.3,
    margin: '0 0 10px 0',

    '@media (max-width: 479px)': {
      fontSize: '22px',
    },
  },

  contentSubTitle: {
    color: palette.black[0],
    fontWeight: 400,
    fontSize: '18px',
    textAlign: 'center',
    letterSpacing: 0.3,
    margin: '5px 0 10px 0',

    '@media (max-width: 479px)': {
      fontSize: '16px',
    },
  },

  indentedText: {
    margin: '0 0 0 20px'
  }
})

class Privacy extends Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <h1 className={classes.contentTitle}>Satstreet - Privacy Policy</h1>
        <h1 className={classes.contentSubTitle}>Last Modified: December 15, 2019</h1>
        <p className={classes.body}>

        <span className={classes.boldText}>Introduction:</span><br />Satstreet Inc. (“us”, “we” or “Company”) respects our users (each, “you” or “User”) privacy and we are committed to protecting the privacy of Users who access, download, install or register to our mobile application (the “App”), our website or any other online service we provide (the “Service”).<br />We encourage you to read this policy carefully and use it to make informed decisions. We take our obligations regarding privacy seriously and want to ensure that our users are fully informed about the information they provide to us.<br /><br />
This policy outlines our practices of collecting, using, and disclosing your information when you use the Service. The Privacy Policy is a part of the Term of Use as referenced.<br /><br />

        <span className={classes.boldText}>Type of Information We Collect and How We Collect It:</span><br /><br />
        Non-personal Information​: One type of information is un-identified and non-identifiable information pertaining to you, which may be made available or gathered via your use of the Service (“Non-personal Information”). Non-personal information may include your usage information and technical information transmitted by your device, including certain software and hardware information about your device (the device you use, the type of browser and operating system your device uses, language preference, access time and the domain name from which you linked to the Service, in order to improve our App.
        <br /><br />
        Personal Information:​ Another type of information may be individually identifiable information, such as telephone number or any other identifier by which you may be contacted online or offline (“personal information”); that is about you but individually does not identify you.
        <br /><br />
        Voluntary Information:​ We may collect information that you voluntarily provide to us. For example, when you correspond with us via email, social media, or through the App and share additional information with us. We may also collect any complaints from you and other Users which may include personal information.
        <br /><br />
        Device Information:​ We may collect Device Information that may include personal information such as IP address, geolocation data, unique device identifiers, and other information from your activity with the Service.
        <br /><br />
        Cookies and Google Analytics:​ We may use cookies and other methods of web and mobile analysis to gather, store, and track certain information. The use of Google Analytics and how it collects and processes data may be found at the following link: www.google.com/policies/privacy/partners/​. You may opt-out of having or making your activity available to Google Analytics by installing the Google Analytics opt-out browser add-on provided by Google. Additional information may be made available by Google at the following website: https://support.google.com/analytics/answer/181881?hl=en&ref_topic=2919631.
        <br /><br />

        <span className={classes.boldText}>Need for Processing:</span><br /><br />Processing of Personal Information may be required when providing our Service in order to protect our interests and comply with our legal obligations.<br /><br />

        <span className={classes.boldText}>How We Use The Information We Collect:</span><br /><br />The information we collect is used for the following purposes:<br /><br />
        ● To present our App and provide our Service to you<br />
        ● To provide you with notifications about your account and activity<br />
        ● To authenticate your identity as required by AML & KYC regulations if applicable<br />
        ● To communicate and keep you informed of important service and feature updates<br />
        ● To investigate and resolve disputes in connection with your use of the App<br />
        ● To support and troubleshoot the Service for support inquiries<br />
        ● To detect and prevent fraudulent or harmful activity that could jeopardize the Service<br />
        ● To investigate violations of our Terms of Use, or to comply with a valid law enforcement request
        <br /><br />

        <span className={classes.boldText}>Disclosure of Your Information:</span><br /><br />We do not rent, sell, or share your Personal Information with third-parties except as described in this Privacy Policy. We may share Personal Information with subsidiaries, partners, affiliated companies, subcontractors, and other third-party service providers, auditors or advisors, and potential purchasers or investors in the company. We may share Personal Information for the purposes of storing or processing information on our behalf, assisting with business operations, for diagnostics, analytics, and customization. We may also be required to disclose Personal Information with law enforcement agencies in order to comply with any applicable law, regulation, legal process, or government request.<br /><br />

        <span className={classes.boldText}>Third-Party Collection Of Information:</span><br /><br />This policy solely addresses the use of information we collect from you. If we disclose your information to other parties via the Services (e.g., by clicking on a link to another website or location), different rules may apply to their use or disclosure of the information you disclose to them. You acknowledge that Satstreet is not responsible for the content or services that you receive from third-party sites or the privacy practices of those sites, and this Privacy Policy does not apply to any such third-party products and services. You acknowledge and assume all risks of using third-party sites to purchase products and services. You agree that we shall have no liability whatsoever with respect to usage of these third-party sites.<br /><br />

        <span className={classes.boldText}>EU Residents Rights:</span><br /><br />If you are a European Union resident, the following rights specifically apply regarding your personal information. You may (1) Receive confirmation on whether personal information concerning you is being processed, and access to your stored personal information, together with supplementary information; (2) Receive a copy of the personal information you volunteer to us in a structured readable format; (3) Request rectification of your personal information that is in our control; (4) Request erasure of your personal information; (5) Object to the processing of personal information by us; (6) Request to restrict processing of your personal information by us; (7) Lodge a complaint with a supervisory authority.
However, please note that these rights are not absolute, and may be subject to our own legitimate interests and regulatory requirements.
To exercise any of these rights, you may contact us at: info@satstreet.com<br /><br />

        <span className={classes.boldText}>Amendments to Our Privacy Policy:</span><br /><br />We may revise this Privacy Policy with a notice that the policy has been updated on the App home page and by email. If we make any material changes, we will notify you. The date if the privacy policy was last revised is identified at the top of the page. You are responsible for visiting our App and this privacy policy to check for any changes. Your continued use of the App, following the notification of any changes, implies your acknowledgement and consent of such amendments to the Privacy Policy and your agreement to be bound by the terms of such amendments.<br /><br />

        <span className={classes.boldText}>Contact Information:</span><br /><br />If you have any questions or comments about this Privacy Policy and our privacy practices, contact us at: ​info@satstreet.com<br /><br />
   
        </p>
      </div>  
    )
  }
}

Privacy.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Privacy)