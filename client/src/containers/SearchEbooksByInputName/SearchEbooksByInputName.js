import React, { Component } from "react";
import { connect } from "react-redux";
import BookList from "../../components/BookList/BookList";
import Spinner from "../../components/UI/Spinner/Spinner";
import SearchEbooksByInputNameBox from "../../components/SearchEbookByInputName/SearchEbookByInputName";
import { clickedLink } from "../../util/helper";
import * as actions from "../../store/action/rootActions";

class SearchEbooksByInputName extends Component {
   state = {
      query: "",
   };
   componentDidMount() {
      const query = this.props.location.search;
      this.setState({ query: query });
      this.props.onSearchEbooksByInputName(query);
   }

   componentDidUpdate() {
      const newQuery = this.props.location.search;
      if (newQuery !== this.state.query) {
         this.setState({ query: newQuery });
         this.props.onSearchEbooksByInputName(newQuery);
         return true;
      } else {
         return false;
      }
   }

   render() {
      let searchedEbooks;
      if (this.props.loading) {
         searchedEbooks = <Spinner />;
      } else {
         let finalQueryValue;
         if (this.state.query) {
            const stateQuery = this.state.query;
            /* _q=for-beginner => for-beginner */
            const splitState = stateQuery.split("=")[1];
            /* for-beginner => ["for", "beginner"] */
            const splitQuery = splitState.split("-");
            /* ["for", "beginner"] => for beginner */
            finalQueryValue = splitQuery.join(" ");
         }
         const searchDataArr = this.props.ebook_datas.map((ebook) => (
            <BookList
               key={ebook._id}
               {...ebook}
               clicked={() => clickedLink(ebook._id, this.props)}
            />
         ));
         searchedEbooks = (
            <div className="SearchEbookByCategory">
               <div className="SearchEbookByInputNameBox">
                  <SearchEbooksByInputNameBox history={this.props.history} />
               </div>
               <hr className="Tag__hr" />
               <h1>Search Result : {finalQueryValue} </h1>
               <div className="BookLists">{searchDataArr}</div>
            </div>
         );
      }
      return searchedEbooks;
   }
}

const stateToProps = (state) => {
   return {
      ebook_datas: state.ebook.ebook_datas,
      loading: state.ebook.loading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onSearchEbooksByInputName: (query) =>
         dispatch(actions.onSearchEbooksByInputName(query)),
   };
};

export default connect(stateToProps, dispatchToProps)(SearchEbooksByInputName);
