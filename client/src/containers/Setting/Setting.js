import React, { Component } from "react";
import { connect } from "react-redux";
import "./Setting.css";
import settingBg from "../../assets/setting_bg.svg";
import * as actions from "../../store/action/rootActions";

class Setting extends Component {
   state = {
      chgUsername: false,
      chgEmail: false,
      chgPw: false,
      username: "",
      email: "",
      password: "",
      c_password: "",
   };

   showInput = (label) => {
      if (label === "username") {
         this.setState({ chgUsername: true, chgEmail: false, chgPw: false });
      }
      if (label === "email") {
         this.setState({ chgEmail: true, chgUsername: false, chgPw: false });
      }
      if (label === "password") {
         this.setState({ chgPw: true, chgUsername: false, chgEmail: false });
      }
   };

   inputChangeHandler = (event, label) => {
      const value = event.target.value;
      this.setState({ [label]: value });
   };

   cancelInput = (label) => {
      this.setState({ [label]: false });
   };

   saveInput = (label, value, chgValue) => {
      // Argument as object
      this.props.onEditAuth({
         userId: this.props.userId,
         [label]: value,
      });
      this.setState({ [chgValue]: false });
   };

   render() {
      // Show Username or Input box
      const username = this.state.chgUsername ? (
         <div className="Setting__UserInfo__ChgInput">
            <p className="Setting__UserInfo__Label">Username:</p>
            <input
               type="text"
               value={this.state.username}
               onChange={(e) => this.inputChangeHandler(e, "username")}
            />
            <div className="Setting__UserInfor__ChgInput__Btns">
               <span onClick={() => this.cancelInput("chgUsername")}>
                  Cancel
               </span>
               <span
                  onClick={() =>
                     this.saveInput(
                        "username",
                        this.state.username,
                        "chgUsername"
                     )
                  }
               >
                  Save
               </span>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Username:</p>
            <div className="Setting__UserInfo__Data">
               <p>{this.props.username}</p>
               <i
                  className="fas fa-pen"
                  onClick={() => this.showInput("username")}
               ></i>
            </div>
         </div>
      );

      // Show Email or Input box
      const email = this.state.chgEmail ? (
         <div className="Setting__UserInfo__ChgInput">
            <p className="Setting__UserInfo__Label">Email:</p>
            <input
               type="text"
               value={this.state.email}
               onChange={(e) => this.inputChangeHandler(e, "email")}
            />
            <div className="Setting__UserInfor__ChgInput__Btns">
               <span onClick={() => this.cancelInput("chgEmail")}>Cancel</span>
               <span
                  onClick={() =>
                     this.saveInput("email", this.state.email, "chgEmail")
                  }
               >
                  Save
               </span>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Email:</p>
            <div className="Setting__UserInfo__Data">
               <p>{this.props.email}</p>
               <i
                  className="fas fa-pen"
                  onClick={() => this.showInput("email")}
               ></i>
            </div>
         </div>
      );

      // Show Password or Input box
      const password = this.state.chgPw ? (
         <div>
            <div className="Setting__UserInfo__ChgInput">
               <p className="Setting__UserInfo__Label">Password:</p>
               <input
                  type="text"
                  value={this.state.password}
                  onChange={(e) => this.inputChangeHandler(e, "password")}
               />
            </div>
            <div className="Setting__UserInfo__ChgInput">
               <p className="Setting__UserInfo__Label__CPw">
                  Confirm Password:
               </p>
               <input
                  type="text"
                  value={this.state.c_password}
                  onChange={(e) => this.inputChangeHandler(e, "c_password")}
               />
               <div className="Setting__UserInfor__ChgInput__Btns">
                  <span onClick={() => this.cancelInput("chgPw")}>Cancel</span>
                  <span
                     onClick={() =>
                        this.saveInput("password", this.state.password, "chgPw")
                     }
                  >
                     Save
                  </span>
               </div>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Password:</p>
            <div className="Setting__UserInfo__Data">
               <p>*******</p>
               <i
                  className="fas fa-pen"
                  onClick={() => this.showInput("password")}
               ></i>
            </div>
         </div>
      );

      return (
         <div className="row Setting">
            {/* Left Columm */}
            <div className="col col-md-6">
               <h1>Setting</h1>
               <div className="Setting__Bg">
                  <img src={settingBg} alt="Setting Background" />
               </div>
            </div>
            {/* Right Columm */}
            <div className="col col-md-6">
               <div className="Setting__UserInfo">
                  <div className="Setting__UserInfo__Group">{username}</div>
                  <div className="Setting__UserInfo__Group">{email}</div>
                  <div className="Setting__UserInfo__Group">{password}</div>
               </div>
            </div>
         </div>
      );
   }
}

const stateToProps = (state) => {
   return {
      userId: state.auth.userId,
      username: state.auth.username,
      email: state.auth.email,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onEditAuth: (data) => dispatch(actions.onEditAuth(data)),
   };
};

export default connect(stateToProps, dispatchToProps)(Setting);
