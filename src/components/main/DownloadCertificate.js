// React
import React from "react";

// Dependencies
import { PDFDownloadLink } from "@react-pdf/renderer";

// Import Components
import Certificate from "./Certificate";


<PDFDownloadLink
document={<Certificate email="test@test.com" amount="1000"/>}
fileName="certificate.pdf"
>
Download Your Certificate
</PDFDownloadLink>