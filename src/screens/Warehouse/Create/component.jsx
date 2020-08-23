import React, { Component } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

class CreateWarehouse extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
        Create warehouse
      </div>
    );
  }
}

export default withRouter(CreateWarehouse);
