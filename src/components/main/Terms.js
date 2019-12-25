
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

class Terms extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <h1 className={classes.contentTitle}>Satstreet - Terms of Use</h1>
        <h1 className={classes.contentSubTitle}>Last Modified: December 15, 2019</h1>
        <p className={classes.body}>

        <span className={classes.boldText}>1. Acceptance</span><br /><br />These terms and conditions (the “Terms”) are entered into by and between You and Satstreet Inc. (“Company”, “Satstreet”, “we” “us” or “our”). These Terms govern your access to and use of Satstreet.com including any content, functionality and services (the “Services”) offered on the Satstreet website and mobile application (collectively referred to as the “App”). By accessing and using our Services, you agree to be bound by these Terms and our Privacy Policy found at Satstreet.com/privacy, incorporated by reference link. We encourage you to read these Terms carefully before you start to use the App. If you do not agree to any of the provisions of these Terms and Privacy Policy you should immediately stop using the App.<br /><br />
        <span className={classes.boldText}>2. Definitions</span><br /><br />For the purpose of these Terms:<br /><br />

        <span className={classes.boldText}>“AML” </span>stands for Anti-Money Laundering, which means a set of procedures, laws, and regulations that are intended to stop the practice of generating income through illegal actions.<br />
        <span className={classes.boldText}>"Contributions" </span>means any unsolicited idea, suggestion or other material in any format;<br />
        <span className={classes.boldText}>“Digital Asset(s)” </span>means digital representation(s) of value in which cryptographic protocols are used to regulate the generation and transaction of digital units.<br />
        <span className={classes.boldText}>"Satstreet", "we", "us, or "our" </span>means Satstreet Inc., a Canadian corporation;<br />
        <span className={classes.boldText}>"Satstreet Content" </span>means any text, sound, graphics, trade-marks, service marks, logos, taglines, trade names and other material owned by us or our licensors and made available through the Services<br />
        <span className={classes.boldText}>"parties" </span>means you and us;<br />
        <span className={classes.boldText}>"Personal Information" </span>has the meaning set out in the Privacy Statement;<br />
        <span className={classes.boldText}>"Private Keys" </span>means secret keys, recovery phrases, and passphrases<br />
        <span className={classes.boldText}>"Representatives" </span>means us and our affiliates, business partners, licensors, agents, content providers (not including you), service providers, employees, personnel, officers, directors, and representatives;<br />
        <span className={classes.boldText}>"Services" </span>means the website www.satstreet.com and the services available through that website;<br />
        <span className={classes.boldText}>"Terms" </span>means these Satstreet Terms and Conditions of Use;<br />
        <span className={classes.boldText}>"you"​ or ​"your" </span>means (i) the individual, if the individual is licensing the Services for his or her personal use; or (ii) the corporation, institution, partnership, organization or other entity on whose behalf the individual accepting these Terms is acting;<br />
        <span className={classes.boldText}>"your account"​ </span>means the user account you must register for, in order to use certain Services;<br />
        <span className={classes.boldText}>"your content"​ </span>means any text, sound, graphics, or other material which you post, upload, or otherwise share on or through the Services;<br /><br />
        
        <span className={classes.boldText}>3. Eligibility and AML Considerations</span><br /><br />Satstreet is offered and available to users who are 18 years of age or older, and most countries around the world. Please be advised that in some jurisdictions, due to regulatory considerations, Satstreet may not provide part or all of the Services. By using Satstreet, you represent and warrant that you are of legal age to form a binding contract with the Company to meet all the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the App.<br /><br />In order to comply with applicable Anti Money Laundering (“AML”) and Know Your Client (“KYC”) requirements, Satstreet may limit each transaction to be below certain thresholds depending on your region. For example, users from Canada will be limited to transactions of $1,000 CAD, while European users will be limited to 250 Euros per transaction. In order to exceed these transaction restrictions we will ask for documentation including but not limited to copies of issued identification document (e.g. Driver’s License, Passport, Proof of Address). Corporate accounts require information related to the identification of the directors, officers, and equity owners of the business. We may also use information from third parties to help us confirm your identity and/or determine if we should open or maintain your Account. You agree and warrant at all times that all information provided by you to us is true, accurate, and not fraudulent in any respect. If any such information changes, it is your obligation to provide new information as soon as possible following such change.<br /><br />

        <span className={classes.boldText}>4. Changes to the Terms</span><br /><br />We reserve the right to discontinue or make changes to any Accounts or Services. We may revise and change these Terms, and we may add or delete from these Terms, and the updated version will supersede all prior versions. We will provide notice of changes, additions, and deletions as required by law. If we have provided advance notice and you do not agree with any change, you may close your Account(s) before the effective date of the change, which shall be your sole remedy. Your continued use of Satstreet following the posting of revised Terms means that you accept and agree to the changes.<br /><br />
        
        <span className={classes.boldText}>5. Satstreet Services</span><br /><br />
Satstreet provides a way to store, use and manage Bitcoin and any other supported Digital Assets designated by Satstreet. At present, Bitcoin is the only supported Digital Asset, although we reserve the right to add other assets over time. We may make temporary or permanent changes, revisions, or closures of our Services at any time for any reason with or without notice. In this case, you may be prevented from accessing or using our Services. If, in our sole discretion, we decide to permanently discontinue our Services, we will use commercially reasonable efforts to provide you with notice such as by email, app notification, and/or posting on social media accounts. You may send and receive supported Digital Assets only to another Satstreet user, or to an external account or waller outside of Satstreet. Satstreet may charge a withdrawal fee in addition to a transaction processing fees charge by the network (payable to the receiver of the block reward in which your transaction is processed). These fees will be displayed by the App before you confirm any transaction to an external wallet address.<br /><br />
You are solely responsible for the actions of your Account and for properly securing your passwords or any codes you use to access your Account and the Services. Satstreet is not responsible for any loss or compromise of your access information and/or personal information, or for any loss that you may sustain due to compromise of your access information and/or personal information. We will not be liable for following any instructions we receive through your account, even if it was not authorized by you, or if it was entered by mistake or is otherwise inaccurate. We may require your signature or identification in any form we deem necessary in order to verify the authenticity of any instructions we receive from your Account. You agree to reimburse us (and we may charge your Account) for all claims, costs, losses and damages, including reasonable attorneys’ fees, that result from our following of your instructions to take any action related to your account.<br /><br />
       
        <span className={classes.boldText}>6. Bitcoin Transactions and Supported Digital Assets</span><br /><br />You acknowledge and agree that the value of a Digital Asset is highly volatile and that buying, selling, and holding any Digital Asset involves a high degree of risk. Digital Asset networks are operated by decentralized networks of independent third parties. Once a transaction has been requested from your Account, the network will automatically complete or reject the request and you will not be able to cancel or otherwise modify your transaction request.<br /><br />The applicable Digital Asset network is solely responsible for verifying and confirming transactions that you request and Satstreet cannot confirm, cancel, or reverse transactions to external wallet addresses other than provide confirmation of the network’s completion of a transaction. Satstreet has no control over any Digital Asset network and therefore cannot and does not guarantee that any transaction you request will be completed. You agree that the transaction request may not be completed or may be delayed. When you request a transaction you authorize us to submit your transaction to the applicable network according to your instructions. Once a transaction has been initiated, it cannot be reversed.<br /><br />
        
        <span className={classes.boldText}>7. Liability for User Errors</span><br /><br />You agree and acknowledge that Satstreet will not be held responsible for any errors or omissions that you make in connection with any Digital Asset transaction initiated via the App, including but not limited to the use of any incorrect address.<br /><br />
        
        <span className={classes.boldText}>8. Digital Asset Ownership</span><br /><br />You agree to represent and warrant to us at all times during which you hold Digital Assets in your Account that any Digital Asset used by you in connection with your Account is owned by you or that you are validly authorized to carry out transactions using such Digital Assets, and that all transactions are for your own Account on not on behalf of a third party. You represent and warrant that all such Digital Assets are free from any claims, indebtedness, liens, or third party interests.<br /><br />

        <span className={classes.boldText}>9. Consent to SMS and Push Notifications</span><br /><br />To use Satstreet SMS services you must have a valid mobile phone number. If you provide us with a plain text phone number to facilitate an invitation or transfer we may use the phone number for the purpose it was provided and we will then delete such data in accordance with our data retention policies. The App requires permission to send push notifications to your mobile device and you hereby consent to such communications.<br /><br />
        
        <span className={classes.boldText}>10. Risk Disclosure</span><br /><br />These Terms and use of Satstreet does not create a fiduciary relationship between us and you; your Account is not a checking or savings account, and is not covered by insurance against losses. We may lend, sell, pledge, hypothecate, assign, invest, use, commingle or otherwise dispose of funds and Eligible Digital Assets to counterparties or hold the Eligible Digital Assets with counterparties, and we will use our best commercial and operational efforts to prevent losses.<br /><br />Most Digital Assets are not legal tender, are not backed by any government, and accounts and value balances are not subject to Federal Deposit Insurance Corporation or Securities Investor Protection Corporation protections. Legislative and regulatory changes or actions at the state, federal, or international level may adversely affect the use, transfer, exchange, and value of Digital Assets. Transactions in Digital Assets may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be recoverable. Any secured account maintained by Satstreet for the benefit of its customers may not be sufficient to cover all losses incurred by customers.<br /><br />The volatility and unpredictability of the price of Digital Assets may result in significant loss over a short period of time. The nature of Digital Assets may lead to an increased risk of fraud or cyber-attack, including rollback attacks or Blockchain reorganizations. The nature of Digital Assets means that any technological difficulties experienced by Satstreet may prevent the access or use of your Digital Assets and/or cause losses of Digital Assets.
<br /><br />Although Satstreet uses best practices to protect against cyber threats, circumstances may arise where we experience losses or damages. In that event, Satstreet shall use it balance sheet to cover damages. If the losses exceed Satstreet’s balance sheet, you authorize Satstreet to use Eligible Digital Assets to absorb the remaining losses.<br /><br />

        <span className={classes.boldText}>11. Intellectual Property Rights</span><br /><br />The App and its entire contents, features and functionality (including all information, text, audio, images, and video), are owned by Satstreet, its licensors or other providers of such material and are protected by Canada and international copyright, trademark and patent law. These Terms allow you to use the App for non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of the material in our App, unless it is for your own personal and non-commercial use.<br /><br />The Company name and all related logos, product and service names and slogans are trademarks of the Company or its affiliates or licensors. Your must not use such marks without the prior written permission of the Company.<br /><br />

        <span className={classes.boldText}>12. Withdrawals</span><br /><br />You may request withdrawal of all or some of the funds from your Account at any time up to the transaction limit for your region. Any request that exceeds the transaction limit for your region will require identification per KYC and AML requirements. Satstreet will initiate the withdrawal process following a withdrawal request when possible, but we may require up to three (3) days after you submit your withdrawal request in order to process the transaction.<br /><br />Satstreet and our payment partners may experience cyber-attacks, extreme market conditions, or operational and technical difficulties which could result in the immediate suspension of deposits and/or withdrawals either temporarily or permanently. Satstreet will not be responsible or liable for any loss or damage of any sort incurred to you as a result of such suspension of deposits or withdrawals. Withdrawal limits based on amounts and frequency may apply from time to time. Every withdrawal request shall be deemed as pending until accepted by us. We may deny such request, or delay the processing of an approved request for any reason, including but not limited to insufficient funds in your Account, inaccurate or misleading information you provided, or any suspicion of money laundering or other financial crime related to your Account. Any individual request to exceed withdrawal limits set by Satstreet may be sent via email to ​support@satstreet.com<br /><br />
        
        <span className={classes.boldText}>13. Hard Forks</span><br /><br />Digital Assets may experience a Hard Fork which results in two separate chains and Digital Asset versions on each chain. As a result of the technical complexity of supporting Hard Forks, the support of any new Digital Asset in your account is solely at the discretion of Satstreet. The support of said Digital Asset may or may not be announced on our social media accounts or in a notification to you. You hereby agree that Satstreet assumes no responsibility whatsoever with respect to new Digital Assets that result from a Hard Fork.<br /><br />
        
        <span className={classes.boldText}>14. Payments to Email Addresses, Phone Numbers, & Social Media Usernames</span><br /><br />Satstreet offers a proprietary Digital Asset payment tool to our users. Satstreet allows you to send payments of Digital Assets to any email address and eventually other mediums such as phone numbers and social media usernames. By using Satstreet you understand and acknowledge that the transfer of funds by Satstreet is not recorded on any Digital Asset blockchain. The transfer is managed on Satstreet’s internal system. Any payment sent to the wrong user may be irrecoverable, and is your sole responsibility to provide the correct address, number, or username. The completion of a transfer may not be immediate and it may take time before the transfer is processed and the receiver’s account is credited. The use of Satstreet is limited in amount transferred as determined by our AML and KYC policies, which may change from time to time. You agree that you are familiar with the person you are sending payment to and that such payment is not made for any illicit or illegal purpose.<br /><br />

        <span className={classes.boldText}>15. Prohibited Use</span><br /><br />You may not use Satstreet for any illegal purposes or in violation of these Terms. You agree not to use the App in any way that would violate any law or regulation, including but not limited to AML and KYC requirements, embargoed or restricted persons or locations, prohibitions against money laundering and/or anti-bribery laws, and structured transactions or tax evasion, and Satstreet may refuse to perform, block, or otherwise void any transfers that Satstreet reasonably believes could violate any law or regulation.<br /><br />You agree not to create multiple wallets to manipulate or in anyway take advantage of referral programs in order to unfairly gain from rewards or promotions. You agree not to impersonate the Company, a Company employee, or another user. You agree not to engage in any behavior that would result in an interruption of the Service for other users. You agree to act in good faith and not cause or direct harm to Satstreet’s brand or Service.<br /><br />

        <span className={classes.boldText}>16. Taxes</span><br /><br />We are not responsible for determining whether taxes apply to your transactions, or for collecting, reporting, or remitting any taxes from any transaction(s). You are solely responsible for complying with applicable law. You agree that Satstreet is not responsible for determining applicable tax law for your region.<br /><br />

        <span className={classes.boldText}>17. Presented Information</span><br /><br />The information presented on or through Satstreet is available for general information. We do not warrant the accuracy or usefulness of this information. Any reliance you place on such information is at your own risk. You release us from any liability and responsibility arising from any reliance placed on such information provided by the Service. Satstreet may include content provided by third parties. Any opinions provided in third party information may not reflect the opinion of Satstreet. We are not liable to you or any third party for the content or accuracy of the information provided by third parties.
<br /><br />

        <span className={classes.boldText}>18. Account Closures</span><br /><br />We reserve the right to close your Account at any time for any reason without notice. We will return any Digital Assets in your account within a reasonable timeframe. Satstreet may be required by law to turn over the funds in abandoned or unclaimed customer accounts to the state of your last known residence. You are responsible to determine the applicability of such laws in your region. Satstreet may deduct a dormancy fee or other administrative charges for such unclaimed or abandoned Digital Assets, as permitted by applicable law.<br /><br />

        <span className={classes.boldText}>19. No Advice</span><br /><br />Satstreet cannot provide financial, legal, tax, insurance, or investment advice. All information provided by Satstreet is for general information purposes and you are solely responsible for determining whether any transaction is appropriate for you.<br /><br />

        <span className={classes.boldText}>20. Account Information Disclosure</span><br /><br />We may be required to disclose certain account information when required when it is necessary for the Services requested, to verify the existence and condition of your account, for AML and KYC policies, authorized by you, required by government agency or court of law, and as described in our ​Privacy Policy​.<br /><br />

        <span className={classes.boldText}>21. Disclaimer of Warranties & Indemnification</span><br /><br />We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, programs, data or other material due to your use of the App for any services from Satstreet. You agree to indemnify and hold harmless Satstreet and its employees, managers, partners and Affiliates from any losses, damages, suits and expenses, of whatever kind, including attorney fees that we incur from your use of the Services. Your use of the App is at your own risk. Satstreet is provided on an “as is” and “as available” basis, without any warranties of any kind, either expressed or implied. You agree to comply with applicable law and to not use your account for any transaction that is illegal or violates applicable laws, regulations, or rules. Neither the Company or anyone associated with the Company represents or warrants that the App or any Service will be accurate, reliable, error-free or uninterrupted. The Company hereby disclaims all warranties of any kind, whether expressed or implied, including but not limited to any warranties of accessibility, non-infringement, and fitness for a particular purpose. The foregoing does not affect any warranties which cannot be excluded or limited under applicable law.<br /><br />You agree that we are not liable for claims, costs, losses or damages caused by an event that is beyond our reasonable control (e.g. the acts or omissions of third parties, natural disasters, emergency conditions, government actions, equipment or communications malfunction. You agree to indemnify and hold harmless the Company and service providers and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses arising out of your violation of these Terms.<br /><br />WE RESERVE THE RIGHT TO TEMPORARILY OR PERMANENTLY LIMIT ACCESS TO YOUR ACCOUNTS WITHOUT PRIOR NOTICE (UNLESS PRIOR NOTICE IS REQUIRED BY LAW), AND WE SHALL HAVE NO LIABILITY FOR SUCH ACTIONS. IN ADDITION, SATSTREET RESERVES THE RIGHT TO WITHHOLD OR DELAY THE WITHDRAWAL OF FUNDS OR ASSETS BELONGING TO YOU IF YOU FAIL TO COMPLY WITH THESE TERMS. OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM IS LIMITED TO THE FACE VALUE OF THE APPLICABLE TRANSACTION, OR THE ACTUAL VALUE OF ANY FUNDS NOT PROPERLY CREDITED OR DEBITED.<br /><br />
        
        <span className={classes.boldText}>22. Governing Law and Region</span><br /><br />The relationship between Satstreet and you is governed exclusively by the laws of the Province of Ontario, Canada. Any dispute or claim arising therefrom, shall be governed by the laws of Ontario, Canada without giving effect to any choice or conflict of law provision or rule. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.<br /><br />

        <span className={classes.boldText}>23. Waiver and Severability</span><br /><br />We may delay exercise of, or entirely waive any rights we have under these Terms. If we delay or waive our rights, you are still obligated to pay us Obligations you may owe us, remove any violation of these Terms and/or otherwise follow our instructions (as applicable). Any delay or waiver of our rights applies only to the specific instance in which we decide to delay or waive the provision and does not affect our other or subsequent rights in any way.<br /><br />If any provision of these Terms of Use is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Use will continue in full force and effect.<br /><br />

        <span className={classes.boldText}>24. Entire Agreement</span><br /><br />The Terms and our ​Privacy Policy​ constitutes the sole and entire agreement between you an Satstreet with respect to the Service and supersedes all prior understandings, agreements, representations, and warranties, both written and oral with respect to the Service.<br /><br />All other feedback, comments, or requests for technical support and other communications relating to the App should be directed to: info@satstreet.com<br /><br />
        
        </p>
      </div>  
    )
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Terms)