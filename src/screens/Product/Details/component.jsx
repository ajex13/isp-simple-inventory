import React, { Component } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

class ProductDetails extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
        procuct details here
      </div>
    );
  }
}

export default withRouter(ProductDetails);
