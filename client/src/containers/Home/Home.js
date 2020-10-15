import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import BookList from "../../components/BookList/BookList";
import * as actions from "../../store/action/rootActions";
import { clickedLink } from "../../util/helper";
import Carosal from "../../components/Carosal/Carosal";
import SearchEbookByInputName from "../../components/SearchEbookByInputName/SearchEbookByInputName";
import Spinner from "../../components/UI/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";

class Home extends Component {
   state = {
      query: "",
   };

   componentDidMount() {
      this.setState({ query: this.props.history.location.search });
      this.props.onFetchEbooks(this.props.history.location.search);
   }

   componentDidUpdate() {
      if (this.state.query !== this.props.history.location.search) {
         this.setState({ query: this.props.history.location.search });
         this.props.onFetchEbooks(this.props.history.location.search);
         return true;
      } else {
         return false;
      }
   }

   render() {
      let Home;
      let bookLists = [];

      // Add Ebook Data to BookList By looping
      if (this.props.ebook_datas) {
         this.props.ebook_datas.map((ebook_data) => {
            return bookLists.push(
               <BookList
                  key={ebook_data._id}
                  {...ebook_data}
                  clicked={() => clickedLink(ebook_data._id, this.props)}
               />
            );
         });
      }

      // Whether Show Spinner or Home page by checking loading
      if (this.props.loading) {
         Home = <Spinner />;
      } else {
         Home = (
            <div className="Home">
               {/* Image Section */}
               <div className="ImageSlide">
                  <Carosal />
               </div>
               <div className="SearchEbookByInputNameBox">
                  <SearchEbookByInputName history={this.props.history} />
               </div>
               {/* BookList */}
               <h1 className="Home__BookLists__Title">New Books</h1>
               <div className="BookLists">{bookLists}</div>
               <Pagination />
            </div>
         );
      }
      return Home;
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
      onFetchEbooks: (query) => dispatch(actions.onFetchEbook(query)),
   };
};

export default connect(stateToProps, dispatchToProps)(Home);
