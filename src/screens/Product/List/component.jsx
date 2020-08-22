import React, { Component } from "react";
import { fetchAllProducts } from "./actions";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import { PlusIcon } from "@primer/octicons-react";
import InvPagination from "../../../components/InvPagination/component";

class ProductList extends Component {
  constructor(props){
    super(props) 
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

  renderPagination() {
    return (
      <InvPagination
        totalRecords={this.props.totalRecords}
        numberOfRecordPerPage={this.numberOfRecords}
        currentPage={this.props.currentPage}
        fetchData={this.fetchAllProducts}
      />
    );
  }
  renderTableHeader() {
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
  }

  renderTableRows() {
    const { productList } = this.props;

    if (!productList) {
      return (
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      );
    }
    return productList.map((product, index) => {
      return (
        <tr key={product.id}>
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
                Theshold: {low_item_threshold}
              </td>
            );
          })}
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="d-flex flex-row-reverse mb-2">
          <Button color="primary" onClick={true}>
            <PlusIcon aria-label="Add new warehouse" /> New Warehouse
          </Button>
        </div>
        {this.renderPagination()}
        <Table hover responsive bordered>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableRows()}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("globalstate", state);
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
