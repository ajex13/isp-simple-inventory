import React, { Component } from "react";
import { fetchAllProducts } from "./actions";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import { PlusIcon } from "@primer/octicons-react";

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchAllProducts();
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
              const {item_count,low_item_threshold} = warehouse?.ProductWarehouse;
              const isCountLow = item_count < low_item_threshold
            return (
                <td class={isCountLow ? "table-danger" : "table-success"}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
