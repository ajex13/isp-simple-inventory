import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Table,
  Col,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateProduct, fetchProductDetails } from "./actions";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    this.productId = match?.params?.id;
    this.props.fetchProductDetails(this.productId).then(() => {
      const values = {};
      this.props.productDetails.Warehouses.forEach((wh) => {
        values[`${wh.id}-item_count`] = wh.ProductWarehouse.item_count;
        values[`${wh.id}-low_item_threshold`] =
          wh.ProductWarehouse.low_item_threshold;
      });
      this.setState({
        ...this.state,
        ...values,
      });
    });
  }

  handleChange = (e) => {
    e.persist();

    this.setState({ ...this.state, [e.target.name]: Number(e.target.value) });
  };

  handleUpdate = () => {
    const data = [];
    this.props.productDetails.Warehouses.forEach((wh) => {
      data.push({
        warehouseId: wh.id,
        item_count: this.state[`${wh.id}-item_count`],
        low_item_threshold: this.state[`${wh.id}-low_item_threshold`],
      });
    });
    this.props.updateProduct(this.productId, data);
  };

  renderProductInfo = (productDetails) => {
    const info = [];
    for (const property in productDetails) {
      if (["name", "sku_code", "price"].includes(property)) {
        info.push(`${property}: ${productDetails[property]}`);
      }
    }
    return (
      <Card>
        <CardHeader className="p-1">
          <strong>Product Details</strong>
        </CardHeader>
        <CardBody className="p-2">
          <ul className="list-group">
            {info.map((i) => (
              <li class="list-group-item">{i}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    );
  };

  renderQuantityForm = (productDetails) => {
    return (
      <Card>
        <CardHeader className="p-1">
          <strong>Product Details</strong>
        </CardHeader>
        <CardBody className="p-2">
          <Table>
            {productDetails.Warehouses.map((wh) => {
              return (
                <tr>
                  <td>{wh.name}</td>
                  <td>
                    <input
                      type="number"
                      id={`${wh.id}-item_count`}
                      name={`${wh.id}-item_count`}
                      value={this.state[`${wh.id}-item_count`]}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      id={`${wh.id}-low_item_threshold`}
                      name={`${wh.id}-low_item_threshold`}
                      value={this.state[`${wh.id}-low_item_threshold`]}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </Table>
          <Button color="success" onClick={this.handleUpdate}>Save</Button>
        </CardBody>
      </Card>
    );
  };

  render() {
    const { history } = this.props;

    const { productDetails } = this.props;
    if (!productDetails) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Row>
          <div className="d-flex mb-2">
            <Button onClick={() => history.goBack()}>Back</Button>
          </div>
        </Row>
        <Row>
          <Col>{this.renderProductInfo(productDetails)}</Col>
          <Col>{this.renderQuantityForm(productDetails)}</Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productDetails: state.productDetails.productDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductDetails: (productId) =>
      dispatch(fetchProductDetails(productId)),
    updateProduct: (productId, request) =>
      dispatch(updateProduct(productId, request)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
