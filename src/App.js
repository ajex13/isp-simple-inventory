import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./screens/About/component";
import ProductList from "./screens/Product/List/component";
import ProductDetails from "./screens/Product/Details/component";
import CreateWarehouse from "./screens/Warehouse/Create/component";
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
                <Route path="/products/:id">
                  <ProductDetails />  
                </Route> 
                <Route exact path="/">
                  <ProductList />
                </Route>
                <Route exact path="/warehouses/new">
                  <CreateWarehouse/>
                </Route>
                <Route exact path="/about">
                  <About />
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
