import React, { Component } from "react";
import { fetchAllProducts } from "./actions";
import { connect } from "react-redux";
import { Button, Table, Row, Col } from "reactstrap";
import { PlusIcon } from "@primer/octicons-react";
import InvPagination from "../../../components/InvPagination/component";
import { withRouter } from "react-router-dom";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.numberOfRecords = 20;
  }

  componentDidMount() {
    this.props.fetchAllProducts(this.props.currentPage, this.numberOfRecords);
  }

  fetchAllProducts = (pageNumber, pageSize) => {
    this.props.fetchAllProducts(
      pageNumber || this.props.currentPage,
      pageSize || this.numberOfRecords
    );
  };

  renderPagination = () => {
    return (
      <InvPagination
        totalRecords={this.props.totalRecords}
        numberOfRecordPerPage={this.numberOfRecords}
        currentPage={this.props.currentPage}
        fetchData={this.fetchAllProducts}
      />
    );
  };

  onProductRowClick = (id) => {
    this.props.history.push(`/products/${id}`);
  };

  renderTableHeader = () => {
    const { warehouseNames } = this.props;

    return (
      <tr>
        <th>SKU Code</th>
        <th>Product Name</th>
        {warehouseNames.map((name) => (
          <th>{name}</th>
        ))}
      </tr>
    );
  };

  renderTableRows = () => {
    const { productList } = this.props;

    if (!productList) {
      return (
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      );
    }
    if (productList?.length <= 0) {
      return (
        <tr>
          <td colSpan={5}>No records found.</td>
        </tr>
      );
    }
    return productList.map((product, index) => {
      const { history } = this.props;
      return (
        <tr
          key={product.id}
          onClick={() => history.push(`products/${product.id}`)}
        >
          <td>{product.sku_code}</td>
          <td>{product.name}</td>
          {product.Warehouses.map((warehouse) => {
            const {
              item_count,
              low_item_threshold,
            } = warehouse?.ProductWarehouse;
            const isCountLow = item_count < low_item_threshold;
            return (
              <td className={isCountLow ? "table-danger" : "table-success"}>
                Count : {item_count} <br />
                Threshold: {low_item_threshold}
              </td>
            );
          })}
        </tr>
      );
    });
  };
  render() {
    const { history } = this.props;
    return (
      <div>
        <Row>
          <Col>{this.renderPagination()}</Col>
          <Col>
            <div className="d-flex flex-row-reverse mb-2">
              <Button color="primary" onClick={()=> history.push(`/warehouses/new`)}>
                <PlusIcon aria-label="Add new warehouse" /> New Warehouse
              </Button>
            </div>
          </Col>
        </Row>
        <Table hover responsive bordered>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableRows()}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.products.products,
    warehouseNames: state.products.warehouses,
    totalRecords: state.products.count,
    currentPage: state.products.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: (pageNumber, pageSize) =>
      dispatch(fetchAllProducts(pageNumber, pageSize)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
