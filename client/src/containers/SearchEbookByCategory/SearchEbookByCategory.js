import React, { Component } from "react";
import { connect } from "react-redux";
import "./SearchEbookByCategory.css";
import SearchEbookByInputName from "../../components/SearchEbookByInputName/SearchEbookByInputName";
import Tag from "../../components/UI/Tag/Tag";
import BookList from "../../components/BookList/BookList";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/action/rootActions";
import { clickedLink } from "../../util/helper";
import Pagination from "../../components/Pagination/Pagination";

class SearchEbookByCategory extends Component {
   state = {
      searchedName: "",
      type: null,
      query: null,
   };
   componentDidMount() {
      const searchedName = this.props.match.params.searched_category;
      const type = this.props.match.params.type || null;
      const query = this.props.history.location.search || null;
      this.setState({ searchedName: searchedName, type: type, query: query });
      this.props.onSerachEbooksByCategory(searchedName, type, query);
   }

   componentDidUpdate() {
      const newSearchName = this.props.match.params.searched_category;
      const newType = this.props.match.params.type || null;
      const newQuery = this.props.history.location.search || null;
      if (
         this.state.searchedName !== newSearchName ||
         this.state.type !== newType ||
         this.state.query !== newQuery
      ) {
         this.setState({
            searchedName: newSearchName,
            type: newType,
            query: newQuery,
         });
         this.props.onSerachEbooksByCategory(newSearchName, newType, newQuery);
         return true;
      } else {
         return false;
      }
   }
   render() {
      let searchedBookLists;
      // Whether Show Spinner or Result page by checking loading
      if (this.props.loading) {
         searchedBookLists = <Spinner />;
      } else {
         // Category Name
         const searchedName = this.state.searchedName.split("-");

         // Looping ebook_datas for book lists
         const bookLists = this.props.ebook_datas.map((ebook) => (
            <BookList
               key={ebook._id}
               {...ebook}
               clicked={() => clickedLink(ebook._id, this.props)}
            />
         ));

         // Lopping tags data
         const tags = this.props.tags.map((tag) => (
            <Tag
               key={tag}
               name={tag}
               categoryName={this.props.categoryName}
               props={this.props}
            />
         ));

         searchedBookLists = (
            <div className="SearchEbookByCategory">
               <div className="SearchEbookByInputNameBox">
                  <SearchEbookByInputName history={this.props.history} />
               </div>
               <hr className="Tag__hr" />
               <h1>Category Name: {searchedName.join(" ")}</h1>
               <div className="Tags">{tags}</div>
               <div className="BookLists">{bookLists}</div>
               <Pagination />
            </div>
         );
      }

      return searchedBookLists;
   }
}

const stateToProps = (state) => {
   return {
      ebook_datas: state.ebook.searched_ebook_datas,
      tags: state.ebook.tags,
      categoryName: state.ebook.categoryName,
      loading: state.ebook.loading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onSerachEbooksByCategory: (searchedName, query) =>
         dispatch(actions.onSerachEbooksByCategory(searchedName, query)),
   };
};

export default connect(stateToProps, dispatchToProps)(SearchEbookByCategory);
