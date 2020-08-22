import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home/component";
import ProductList from "./screens/Product/List/component";
import Header from "./components/Header/component";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div style={{ top:"40px", width: "800px", margin: "auto" }}>
              <Switch>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
