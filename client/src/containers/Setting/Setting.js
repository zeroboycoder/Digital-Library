import React, { Component } from "react";
import { connect } from "react-redux";
import "./Setting.css";
import settingBg from "../../assets/setting_bg.svg";
import * as actions from "../../store/action/rootActions";
import Spinner from "../../components/UI/Spinner/Spinner";

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

   saveInput = (label, value, chgLabel) => {
      // Argument as object
      const data = {
         userId: this.props.userId,
         [label]: value,
      };
      this.props.onEditAuth(data, label);
      this.setState({ [chgLabel]: false });
   };

   canClick = (label) => {
      let click = false;
      if (label !== "password") {
         click = this.state[label].trim() !== "";
      }
      if (label === "password") {
         click =
            this.state.password.trim() !== "" &&
            this.state.c_password.trim() !== "" &&
            this.state.password === this.state.c_password;
      }
      return click;
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
               <button onClick={() => this.cancelInput("chgUsername")}>
                  Cancel
               </button>
               <button
                  onClick={() =>
                     this.saveInput(
                        "username",
                        this.state.username,
                        "chgUsername"
                     )
                  }
                  disabled={!this.canClick("username")}
               >
                  Save
               </button>
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
               <button onClick={() => this.cancelInput("chgEmail")}>
                  Cancel
               </button>
               <button
                  onClick={() =>
                     this.saveInput("email", this.state.email, "chgEmail")
                  }
                  disabled={!this.canClick("email")}
               >
                  Save
               </button>
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
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.inputChangeHandler(e, "password")}
               />
            </div>
            <div className="Setting__UserInfo__ChgInput">
               <p className="Setting__UserInfo__Label__CPw">
                  Confirm Password:
               </p>
               <input
                  type="password"
                  value={this.state.c_password}
                  onChange={(e) => this.inputChangeHandler(e, "c_password")}
               />
               <div className="Setting__UserInfor__ChgInput__Btns">
                  <button onClick={() => this.cancelInput("chgPw")}>
                     Cancel
                  </button>
                  <button
                     onClick={() =>
                        this.saveInput("password", this.state.password, "chgPw")
                     }
                     disabled={!this.canClick("password")}
                  >
                     Save
                  </button>
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

      let setting;
      if (this.props.authLoading || this.props.loading) {
         setting = <Spinner />;
      } else {
         setting = (
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

      return setting;
   }
}

const stateToProps = (state) => {
   return {
      userId: state.auth.userId,
      username: state.auth.username,
      email: state.auth.email,
      authLoading: state.auth.authLoading,
      loading: state.ebook.loading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onEditAuth: (data, label) => dispatch(actions.onEditAuth(data, label)),
   };
};

export default connect(stateToProps, dispatchToProps)(Setting);
