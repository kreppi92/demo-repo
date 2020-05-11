import React from "react";
import ReactDOM from "react-dom";
import "../src/index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "./constants/styles";
import Signin from "./components/main/Signin";
import Signup from "./components/main/Signup";
import ForgotPassword from "./components/main/ForgotPassword";
import ResetPassword from "./components/main/ResetPassword";
import Privacy from "./components/main/Privacy";
import Terms from "./components/main/Terms";
import Wallet from "./components/main/Wallet";
import Layout from "./components/main/Layout";
import Education from "./components/main/Education";
import Landing from "./components/main/Landing";
import Chart from "./components/main/Chart2";

ReactDOM.render(
  <MuiThemeProvider theme={mainTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Landing />} />
        <Route path="/signin" component={() => <Signin />} />
        <Route path="/create_account" component={() => <Signup />} />
        <Route path="/forgot_password" component={() => <ForgotPassword />} />
        <Route path="/reset_password" component={() => <ResetPassword />} />
        <Route path="/terms" component={() => <Terms />} />
        <Route path="/privacy" component={() => <Privacy />} />
        <Route path="/chart" component={() => <Chart />} />
        <Route path="/wallet" component={() => <Layout component={Wallet} />} />
        <Route
          path="/education"
          component={() => <Layout component={Education} />}
        />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
