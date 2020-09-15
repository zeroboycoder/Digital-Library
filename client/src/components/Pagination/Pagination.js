import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Pagination.css";

class Pagination extends Component {
   nextPageBtn = () => {
      this.props.history.push({ search: `?_page=${this.props.nextPage}` });
   };
   previousPageBtn = () => {
      this.props.history.push({
         search: `?_page=${this.props.previousPage}`,
      });
   };
   render() {
      return (
         <div className="Pagination_Container">
            <div className="Pagination">
               <button
                  className="Pagination__PaginationBtn"
                  onClick={this.previousPageBtn}
                  disabled={this.props.hasPreviousPage ? false : true}
               >
                  <i className="fas fa-angle-left"></i>
               </button>
               <div className="Pagination__PaginationNumber">
                  {/* Start Page */}
                  {this.props.currentPage !== 1 ? (
                     <div>
                        <NavLink to={`?_page=1`}>1</NavLink>
                     </div>
                  ) : null}

                  {/* Previous Page */}
                  {this.props.currentPage > 2 ? (
                     <div>
                        <NavLink to={`?_page=${this.props.previousPage}`}>
                           {this.props.previousPage}
                        </NavLink>
                     </div>
                  ) : null}

                  {/* Current Page */}
                  {this.props.currentPage ? (
                     <div>
                        <NavLink
                           to={`?_page=${this.props.currentPage}`}
                           className="Pagination__PaginationNumber__Active"
                        >
                           {this.props.currentPage}
                        </NavLink>
                     </div>
                  ) : null}

                  {/* Next Page */}
                  {this.props.nextPage < this.props.lastPage ? (
                     <div>
                        <NavLink to={`?_page=${this.props.nextPage}`}>
                           {this.props.nextPage}
                        </NavLink>
                     </div>
                  ) : null}

                  {/* Last Page */}
                  {this.props.lastPage > 0 &&
                  this.props.currentPage !== this.props.lastPage ? (
                     <div>
                        <NavLink to={`?_page=${this.props.lastPage}`}>
                           {this.props.lastPage}
                        </NavLink>
                     </div>
                  ) : null}
               </div>
               <button
                  className="Pagination__PaginationBtn"
                  onClick={this.nextPageBtn}
                  disabled={this.props.hasNextPage ? false : true}
               >
                  <i className="fas fa-angle-right"></i>
               </button>
            </div>
         </div>
      );
   }
}

const stateToProps = (state) => {
   return {
      hasNextPage: state.ebook.pagination.hasNextPage,
      hasPreviousPage: state.ebook.pagination.hasPreviousPage,
      previousPage: state.ebook.pagination.previousPage,
      nextPage: state.ebook.pagination.nextPage,
      currentPage: state.ebook.pagination.currentPage,
      lastPage: state.ebook.pagination.lastPage,
   };
};

export default connect(stateToProps)(withRouter(Pagination));
