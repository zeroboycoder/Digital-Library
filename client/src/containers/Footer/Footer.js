import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.css";
import BookRequest from "../../components/BookRequest/BookRequest";
import Feedback from "../../components/Feedback/Feedback";
import * as actions from "../../store/action/rootActions";

class Footer extends Component {
   state = {
      bookName: "",
      major: "",
      feedback: "",
      isShow: false,
   };

   // For FeedBack
   showFeedbackModal = () => {
      const value = this.state.isShow;
      this.setState({ isShow: !value });
   };

   feedbackChangeHandler = (event) => {
      const value = event.target.value;
      this.setState({ feedback: value });
   };

   submitFeedback = (event) => {
      event.preventDefault();
      const data = { feedbackMsg: this.state.feedback };
      this.props.onFeedback(data);
      this.setState({ feedback: "", isShow: false });
   };

   // For Book request
   inputHandler = (event) => {
      const value = event.target.value;
      this.setState({ bookName: value });
   };

   // For major request
   selectHandler = (event) => {
      const value = event.target.value;
      this.setState({ major: value });
   };

   // Form Handler
   formHandler = (event) => {
      event.preventDefault();
      const data = {
         bookName: this.state.bookName,
         major: this.state.major,
      };
      this.props.onBookRequest(data);
   };

   // Check disable btn or not
   canClick = () => {
      let canClick;
      this.state.bookName.trim() !== "" && this.state.major.trim() !== ""
         ? (canClick = true)
         : (canClick = false);
      return canClick;
   };

   render() {
      let isAuthPage = false;
      const pathname = this.props.location.pathname;
      if (pathname === "/auth/signin" || pathname === "/auth/signup") {
         isAuthPage = true;
      }
      // First Column
      const firstRow = (
         <div className="col col-md-4 First_Column">
            <h2 className="First_Column__Title">Contact Us</h2>
            <div className="Contact_Group">
               <i className="fab fa-facebook-square"></i>
               <a href="https://web.facebook.com/TechUni.Mawlamyine">
                  www.facebook.com/TechUni.Mawlamyine
               </a>
            </div>
            <div className="Contact_Group">
               <i className="fas fa-envelope"></i>
               <a href="mailto:example@test.com">example@test.com</a>
            </div>
            <div className="Contact_Group">
               <i className="fas fa-phone-alt"></i>
               <span>09123456789</span>
            </div>
            <div className="Contact_Group">
               <i className="fas fa-map-marker-alt"></i>
               <span>Mawlamyine, Myanmar</span>
            </div>
         </div>
      );

      // Second Column
      const secondRow = (
         <div className="col col-md-4 Second_Column">
            <div className="Second_Group">
               <p className="Feedback" onClick={this.showFeedbackModal}>
                  Website feedbacks
               </p>
            </div>
            <div className="Second_Group">
               <p>
                  &copy; Technological University, <br /> Mawlamyine - 2020
               </p>
            </div>
            <div className="Second_Group">
               <p className="Second_Group__PoweredBy">Powered by F.I.T</p>
            </div>
         </div>
      );

      // Third Column
      const thirdRow = (
         <div className="col col-md-4 Third_Column">
            <h2 className="Third_Column__Title">Book Request</h2>
            <BookRequest
               inputChanged={(e) => this.inputHandler(e)}
               selectChanged={(e) => this.selectHandler(e)}
               formSubmit={(e) => this.formHandler(e)}
               canClick={this.canClick()}
            />
         </div>
      );

      let footer = "";
      if (!this.props.loading && !this.props.authLoading && !isAuthPage) {
         footer = (
            <div className="Footer">
               <Feedback
                  showed={this.state.isShow}
                  cancalFeedback={this.showFeedbackModal}
                  feedbackChange={(e) => this.feedbackChangeHandler(e)}
                  submitFeedback={(e) => this.submitFeedback(e)}
               />
               <div className="row Footer__Row">
                  {firstRow}
                  {secondRow}
                  {thirdRow}
               </div>
            </div>
         );
      }
      return footer;
   }
}

const stateToProps = (state) => {
   return {
      loading: state.ebook.loading,
      authLoading: state.auth.authLoading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onFeedback: (data) => dispatch(actions.onFeedback(data)),
      onBookRequest: (data) => dispatch(actions.onBookRequest(data)),
   };
};

export default connect(stateToProps, dispatchToProps)(Footer);
