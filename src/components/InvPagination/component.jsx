import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class InvPagination extends Component {
  render() {
    const {
      totalRecords,
      numberOfRecordPerPage,
      currentPage,
      showPages,
    } = this.props;
    if (!totalRecords) {
      return null;
    }
    const pages = Math.ceil(totalRecords / numberOfRecordPerPage);
    const pageButton = [];
    let start = 0;
    let end = 0;
    let showPage = showPages || 5;
    if (pages <= showPage) {
      start = 1;
      end = pages;
    } else {
      if (currentPage > showPage / 2) {
        start = currentPage - 2;
        if (currentPage + 2 > pages) {
          start = pages - 4;
          end = pages;
        } else {
          end = currentPage + 2;
        }
      } else {
        start = 1;
        end = showPage;
      }
    }
    for (let i = start; i <= end; i++) {
      pageButton.push(
        <PaginationItem key={i} active={currentPage === i}>
          {currentPage === i ? (
            <PaginationLink tag="button">{i}</PaginationLink>
          ) : (
            <PaginationLink
              tag="button"
              onClick={this.props.fetchData.bind(
                this,
                i,
                numberOfRecordPerPage
              )}
            >
              {i}
            </PaginationLink>
          )}
        </PaginationItem>
      );
    }
    return (
      <Pagination className="pagination-wrapper m-0">
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            first
            tag="button"
            onClick={this.props.fetchData.bind(this, 1, numberOfRecordPerPage)}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            previous
            tag="button"
            onClick={this.props.fetchData.bind(
              this,
              currentPage - 1,
              numberOfRecordPerPage
            )}
          />
        </PaginationItem>
        {pageButton}
        <PaginationItem disabled={currentPage >= pages}>
          <PaginationLink
            next
            tag="button"
            onClick={this.props.fetchData.bind(
              this,
              currentPage + 1,
              numberOfRecordPerPage
            )}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage >= pages}>
          <PaginationLink
            last
            tag="button"
            onClick={this.props.fetchData.bind(
              this,
              pages,
              numberOfRecordPerPage
            )}
          />
        </PaginationItem>
      </Pagination>
    );
  }
}

export default InvPagination;
