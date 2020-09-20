import React, { Component } from "react";
import { connect } from "react-redux";
import "./Setting.css";
import settingBg from "../../assets/setting_bg.svg";

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

   cancelInput = (label) => {
      this.setState({ [label]: false });
   };

   render() {
      // Show Username or Input box
      const username = this.state.chgUsername ? (
         <div className="Setting__UserInfo__ChgInput">
            <p className="Setting__UserInfo__Label">Username:</p>
            <input type="text" value={this.props.username} />
            <div className="Setting__UserInfor__ChgInput__Btns">
               <span onClick={() => this.cancelInput("chgUsername")}>
                  Cancel
               </span>
               <span>Save</span>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Username:</p>
            <div className="Setting__UserInfo__Data">
               <p>{this.props.username}</p>
               <button>
                  <i
                     class="fas fa-pen"
                     onClick={() => this.showInput("username")}
                  ></i>
               </button>
            </div>
         </div>
      );

      // Show Email or Input box
      const email = this.state.chgEmail ? (
         <div className="Setting__UserInfo__ChgInput">
            <p className="Setting__UserInfo__Label">Email:</p>
            <input type="text" value={this.props.email} />
            <div className="Setting__UserInfor__ChgInput__Btns">
               <span onClick={() => this.cancelInput("chgEmail")}>Cancel</span>
               <span>Save</span>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Email:</p>
            <div className="Setting__UserInfo__Data">
               <p>{this.props.email}</p>
               <button>
                  <i
                     class="fas fa-pen"
                     onClick={() => this.showInput("email")}
                  ></i>
               </button>
            </div>
         </div>
      );

      // Show Password or Input box
      const password = this.state.chgPw ? (
         <div>
            <div className="Setting__UserInfo__ChgInput">
               <p className="Setting__UserInfo__Label">Password:</p>
               <input type="text" value={this.state.password} />
            </div>
            <div className="Setting__UserInfo__ChgInput">
               <p className="Setting__UserInfo__Label__CPw">
                  Confirm Password:
               </p>
               <input type="text" value={this.state.c_password} />
               <div className="Setting__UserInfor__ChgInput__Btns">
                  <span onClick={() => this.cancelInput("chgPw")}>Cancel</span>
                  <span>Save</span>
               </div>
            </div>
         </div>
      ) : (
         <div>
            <p className="Setting__UserInfo__Label">Password:</p>
            <div className="Setting__UserInfo__Data">
               <p>*******</p>
               <button>
                  <i
                     class="fas fa-pen"
                     onClick={() => this.showInput("password")}
                  ></i>
               </button>
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
      username: state.auth.username,
      email: state.auth.email,
   };
};

export default connect(stateToProps)(Setting);
