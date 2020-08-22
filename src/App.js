import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home/component";
import ProductList from "./screens/Product/List/component";
import Header from "./components/Header/component";
import {Container} from "reactstrap";
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.common['Content-Type'] = 'application/json';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Container>
            <div style={{paddingTop:"40px"}}>
              <Switch>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
            </Container>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
