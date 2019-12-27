import React from "react";
import { Text, Document, Font } from "@react-pdf/renderer";
import logo from "../../assets/logo.png";
import bitcoinImage from "../../assets/bitcoin-image.png";
import courierFont from "../../assets/CourierPrime-Regular.ttf";
import robotoBoldFont from "../../assets/Roboto-Bold.ttf";
import styled from "@react-pdf/styled-components";

Font.register({ family: "Courier Prime", src: courierFont });
Font.register({ family: "Roboto Bold", src: robotoBoldFont });

const PageEl = styled.Page`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  padding: 25px;
  border: 5px;
`;

const Border = styled.View`
  border: 5px;
  border-style: dashed;
  border-color: #5cb2f5;
  padding: 20px;
  flex-grow: 1;
`;

const Cointainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;

const CenterDiv = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Logo = styled.Image`
  max-height: 75px;
  max-width: 300px;
`;

const BitcoinImage = styled.Image`
  max-height: 200px;
  max-width: 300px;
`;

const HeaderEl = styled.View`
  width: 500px;
`;

const Header = styled.Text`
  font-size: 30px;
  font-family: "Roboto Bold";
  margin: 20px;
`;

const OutlinedText = styled.View`
  padding: 5px;
  margin: 10px;
  width: 350px;
  border: 2px;
  border-radius: 5px;
  border-color: #5cb2f5;
`;

const TextFields = styled.Text`
  font-size: 20px;
  font-family: "Courier Prime";
  border-bottom: 1px;
  border-color: #eee;
  width: 100%;
`;

const SubTextFields = styled.Text`
  font-size: 10px;
  font-family: "Helvetica";
  opacity: 0.5;
`;

const Instructions = styled.View`
  width: 500px;
  text-align: left;
  margin: 10px;
  opacity: 0.5;
`;

const Copyright = styled.View`
  opacity: 0.5;
`;

// Create Document Component
const MyDocument = ({ email, amount }) => (
  <Document>
    <PageEl>
      <Border>
        <Cointainer>
          <CenterDiv>
            <Logo source={logo} />
          </CenterDiv>
          <CenterDiv>
            <BitcoinImage source={bitcoinImage} />
          </CenterDiv>
          <CenterDiv>
            <HeaderEl>
              <Header>Bitcoin Gift Certificate</Header>
            </HeaderEl>
          </CenterDiv>
          <CenterDiv>
            <OutlinedText>
              <TextFields>{email}</TextFields>
              <SubTextFields>Email Address</SubTextFields>
            </OutlinedText>
          </CenterDiv>
          <CenterDiv>
            <OutlinedText>
              <TextFields>{amount} sats</TextFields>
              <SubTextFields>Amount</SubTextFields>
            </OutlinedText>
          </CenterDiv>
        </Cointainer>
        <CenterDiv>
          <HeaderEl>
            <Instructions>
              <Text>Claim your BitCoin in 3 Easy Steps:</Text>
              <Text>1. Visit our website at https://www.satstreet.com</Text>
              <Text>
                2. Create your account using the above email address and enter a
                secure password
              </Text>
              <Text>
                3. Verify your email address by entering the code that was sent
                to you
              </Text>
              <Text>
                Congrats! You now own BitCoin. Explore our website to learn
                more.
              </Text>
            </Instructions>
            <Copyright>
              <Text>Satstreet Inc &copy; 2019</Text>
            </Copyright>
          </HeaderEl>
        </CenterDiv>
      </Border>
    </PageEl>
  </Document>
);

export default MyDocument;
