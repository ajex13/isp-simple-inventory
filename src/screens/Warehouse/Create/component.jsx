import React, { Component } from "react";
import { Button, Row, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import {createWarehouse} from './action';

class CreateWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
        name: "",
        pincode: "",
        max_capacity: 0,
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      formDetails: {
        ...this.state.formDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.formDetails.name.trim() &&
      this.state.formDetails.pincode.trim()
    ) {
      createWarehouse(this.state.formDetails).then(() => {
        this.handleReset();
      });
    }
  };

  handleReset = () => {
    this.setState({
      ...this.state,
      formDetails: {
        ...this.state.formDetails,
        name: "",
        pincode: "",
        max_capacity: 0,
      },
    });
  };

  renderCreateWarehouseForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Warehouse Name"
            onChange={this.handleInputChange}
            value={this.state.formDetails.name}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="pincode">Pincode</Label>
          <Input
            type="text"
            name="pincode"
            id="pincode"
            placeholder="Enter pincode"
            onChange={this.handleInputChange}
            value={this.state.formDetails.pincode}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="max_capacity">Max Capacity</Label>
          <Input
            type="number"
            name="max_capacity"
            id="max_capacity"
            placeholder="Enter Max Capacity"
            onChange={this.handleInputChange}
            value={this.state.formDetails.max_capacity}
            required
          />
        </FormGroup>
        <div className="d-flex flex-row-reverse">
          <Button color="success" type="submit">
            Submit
          </Button>
          <Button className="mr-3" onClick={this.handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    );
  };
  render() {
    const { history } = this.props;
    return (
      <div>
        <Row>
          <div className="d-flex mb-2">
            <Button onClick={() => history.goBack()}>Back</Button>
          </div>
        </Row>
        <Row>
          <Col>{this.renderCreateWarehouseForm()}</Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(CreateWarehouse);
