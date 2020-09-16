import React, { Component } from "react";
import { connect } from "react-redux";
import "./EbookDetail.css";
import * as actions from "../../store/action/rootActions";
import SearchEbookByInputName from "../../components/SearchEbookByInputName/SearchEbookByInputName";
import SuggestionBook from "../../components/SuggestionBook/SuggestionBook";
import CommentBox from "../../components/Comment/CommentBox/CommentBox";
import { checkValidation } from "../../util/helper";
import Spinner from "../../components/UI/Spinner/Spinner";

class EbookDetail extends Component {
   state = {
      params: null,
      comments: [],
      commentForm: {
         email: {
            validation: {
               isRequired: true,
               isEmail: true,
            },
            value: "",
            isValid: false,
            errMsg: "Email isn't valid.",
         },
         comment: {
            validation: {
               isRequired: true,
            },
            value: "",
            isValid: false,
            errMsg: "Comment is required.",
         },
      },
   };

   componentDidMount() {
      const book_id = this.props.match.params.book_id;
      this.setState({ params: this.props.history.location.pathname });
      this.props.onFetchDetailOfEbook(book_id);
   }

   componentDidUpdate() {
      const newParms = this.props.history.location.pathname;
      if (this.state.params !== newParms) {
         const book_id = this.props.match.params.book_id;
         this.setState({ params: newParms });
         this.props.onFetchDetailOfEbook(book_id);
         return true;
      } else {
         return false;
      }
   }

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updateCommentForm = { ...this.state.commentForm };
      updateCommentForm[key].value = value;
      updateCommentForm[key].isTouch = true;
      updateCommentForm[key].isValid = checkValidation(
         value,
         updateCommentForm[key].validation
      );
      this.setState({ commentForm: updateCommentForm });
   };

   formSubmitHandler = (event) => {
      event.preventDefault();
      const book_id = this.props.detail_of_ebook._id;
      const data = {
         email: this.state.commentForm.email.value,
         comment: this.state.commentForm.comment.value,
      };
      const updateCommentForm = this.state.commentForm;
      updateCommentForm.email.value = "";
      updateCommentForm.comment.value = "";
      this.props.onAddComment(book_id, data);
      this.setState({ commentForm: updateCommentForm });
   };

   render() {
      let ebookDetail = null;
      // Whether Show Spinner or Result page by checking loading
      if (this.props.loading) {
         console.log("Loading");
         ebookDetail = <Spinner />;
      } else {
         // if not loading
         // then check detail of ebook
         if (this.props.detail_of_ebook) {
            const bookInfo = (
               <div className="row BookInfo">
                  <div className="col col-md-4 BookInfo__BookCover">
                     <img
                        src={this.props.detail_of_ebook.bookCoverLocation}
                        alt="Book Cover"
                     />
                  </div>
                  <div className="col col-md-8 BookInfo__Info">
                     <h1>{this.props.detail_of_ebook.bookName}</h1>
                     <p className="BookInfo__Info__ReleasedYear">
                        Release Year: {this.props.detail_of_ebook.releasedYear}
                     </p>
                     <p>Author: {this.props.detail_of_ebook.author}</p>
                     <p>File Size: {this.props.detail_of_ebook.fileSide} MB</p>
                     <p>
                        Page Number: {this.props.detail_of_ebook.pages} Pages
                     </p>
                     <p>{this.props.detail_of_ebook.description}</p>
                     <div className="BookInfo__Info__DownloadBtn">
                        <a
                           href={this.props.detail_of_ebook.pdfLocation}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <button>Download</button>
                        </a>
                     </div>
                  </div>
               </div>
            );

            const suggestions = this.props.suggestionBooks.map(
               (suggestionBook) => {
                  return (
                     <SuggestionBook
                        key={suggestionBook._id}
                        {...suggestionBook}
                     />
                  );
               }
            );

            const showComment = this.props.comments.map((commentObj) => {
               const emailArr = commentObj.email.split("@");
               return (
                  <div
                     className="EbookDetail__Comment__ShowComment"
                     key={commentObj._id}
                  >
                     <div>
                        <i className="fas fa-user-circle"></i>
                        {/* <i className="far fa-user-circle"></i> */}
                     </div>
                     <div>
                        <p className="EbookDetail__Comment__ShowComment__Email">
                           {emailArr[0]}
                           {this.props.token && <span>@{emailArr[1]}</span>}
                        </p>
                        <p className="EbookDetail__Comment__ShowComment__Comment">
                           {commentObj.comment}
                        </p>
                     </div>
                  </div>
               );
            });

            ebookDetail = (
               <div className="EbookDetail">
                  <div className="SearchEbookByInputNameBox">
                     <SearchEbookByInputName history={this.props.history} />
                  </div>
                  <hr className="Tag__hr" />
                  {bookInfo}
                  <div className="EbookDetail__Suggestions">
                     <h1>Suggestions</h1>
                     <div className="EbookDetail__Suggestions__Books">
                        {suggestions}
                     </div>
                  </div>
                  <div className="EbookDetail__Comment">
                     <div className="EbookDetail__Comment__Title">
                        <h1>Comments</h1>
                     </div>
                     <CommentBox
                        commentForm={this.state.commentForm}
                        changedEmail={(e) =>
                           this.inputChangeHandler(e, "email")
                        }
                        changedComment={(e) =>
                           this.inputChangeHandler(e, "comment")
                        }
                        formSubmitted={this.formSubmitHandler}
                     />
                     {showComment}
                  </div>
               </div>
            );
         }
      }
      return ebookDetail;
   }
}

const stateToProps = (state) => {
   return {
      detail_of_ebook: state.ebook.detail_of_ebook,
      suggestionBooks: state.ebook.suggestionBooks,
      loading: state.ebook.loading,
      comments: state.ebook.comments,
      token: state.auth.token,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onFetchDetailOfEbook: (book_id) =>
         dispatch(actions.onFetchDetailOfEbook(book_id)),
      onAddComment: (book_id, data) =>
         dispatch(actions.onAddComment(book_id, data)),
   };
};

export default connect(stateToProps, dispatchToProps)(EbookDetail);
