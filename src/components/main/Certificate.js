import React from "react";
import {
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Page
} from "@react-pdf/renderer";
import image from "../../assets/logo.png";
import styled from "@react-pdf/styled-components";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 10
  },
  section: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    textAlign: "center"
  },
  image: {
    maxHeight: 75,
    maxWidth: 300
  },
  textOutline: {
    borderRadius: 25,
    borderSize: 2,
    borderColor: `#000`,
    borderStyle: "solid",
    padding: 20
  }
});

const TextBox = styled.Text`
  margin: 10px;
  font-size: 10px;
  font-family: "Helvetica";
  border-size: 2;
  border-color: #000000;
  border-style: solid;
`;

const OutlinedText = styled.View`
  border-size: 2;
  border-color: #000000;
  border-style: solid;
`;

const CenterDiv = styled.View`
  justify-content: center;
  text-align: center;
`;

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <CenterDiv>
        <Image source={image} style={styles.image} />
      </CenterDiv>
      <CenterDiv>
        <Text>BitCoin Gift Certificate</Text>
      </CenterDiv>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <OutlinedText>
          <TextBox>`EMAIL PROP PASSED HERE`</TextBox>
          <Text>Email Address</Text>
        </OutlinedText>
        <OutlinedText>
          <TextBox>`AMOUNT PROP PASSED HERE`</TextBox>
          <Text>Amount</Text>
        </OutlinedText>
        <View>
          <Text>Claim Your Bitcoin at SatStreet.com</Text>
        </View>

        <View>
          <Text>Claim your BitCoin in 3 Easy Steps:</Text>
          <Text>1. Visit Our Website at https://www.satstreet.com</Text>
          <Text>
            2. Create your account using the above email address and enter a
            secure password
          </Text>
          <Text>
            3. Verify your email address by entering the code that was sent to
            you
          </Text>
          <Text>
            Congrats! You now own BitCoin. Explore our website to learn more.
          </Text>
        </View>
        <View>
          <Text>Satstreet Inc &copy; 2019</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
