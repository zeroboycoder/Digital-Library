import React, { Component } from "react";
import { connect } from "react-redux";
import "./Setting.css";
import * as actions from "../../store/action/rootActions";
import { checkValidation, reviewPassword } from "../../util/helper";
import settingBg from "../../assets/setting_bg.svg";
import Spinner from "../../components/UI/Spinner/Spinner";

class Setting extends Component {
   state = {
      userInfos: {
         username: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Username",
            },
            validation: {
               isRequired: true,
            },
            label: "Username",
            value: "",
            isValid: false,
            errMessage: "Please set a username",
            editCondition: false,
         },
         email: {
            elementtype: "input",
            elementconfig: {
               type: "email",
               placeholder: "Email Address",
            },
            validation: {
               isRequired: true,
               isEmail: true,
            },
            label: "Email",
            value: "",
            isValid: false,
            errMessage: "Please set an email address",
            editCondition: false,
         },
         password: {
            elementtype: "input",
            elementconfig: {
               type: "password",
               placeholder: "Password",
            },
            validation: {
               isRequired: true,
               minLength: 6,
            },
            label: "Password",
            value: "",
            isValid: false,
            reviewPwIcon: <i className="far fa-eye"></i>,
            errMessage: "Password has minimum 6 characters",
            editCondition: false,
         },
         c_password: {
            elementtype: "input",
            elementconfig: {
               type: "password",
               placeholder: "Password",
            },
            validation: {
               isRequired: true,
               isMatch: true,
            },
            label: "Confirm Password",
            value: "",
            isValid: false,
            reviewPwIcon: <i className="far fa-eye"></i>,
            errMessage: "Password doesn't match",
         },
      },
   };

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updateInfos = { ...this.state.userInfos };
      updateInfos[key].value = value;
      updateInfos[key].isTouch = true;
      updateInfos[key].isValid = checkValidation(
         value,
         updateInfos[key].validation,
         this.state.userInfos
      );
      this.setState({ userInfos: updateInfos });
   };

   toogleInput = (key) => {
      const updateInfos = { ...this.state.userInfos };
      // Must have one edit condition
      // Incoming key's edit condition is true
      // Others are false
      for (let label in this.state.userInfos) {
         key === label
            ? (updateInfos[label].editCondition = !updateInfos[label]
                 .editCondition)
            : (updateInfos[label].editCondition = false);
      }
      key === "password"
         ? (updateInfos.c_password.editCondition = true)
         : (updateInfos.c_password.editCondition = false);
      this.setState({ userInfos: updateInfos });
   };

   saveInput = (key) => {
      if (key === "c_password") {
         this.state.userInfos.password.editCondition = false;
         this.state.userInfos.c_password.editCondition = false;
         this.state.userInfos.password.value = "";
         this.state.userInfos.c_password.value = "";
         key === "c_password" ? (key = "password") : (key = key);
      } else {
         this.state.userInfos[key].editCondition = false;
         this.state.userInfos[key].value = "";
      }
      // Sent user_id and value
      const data = {
         userId: this.props.userId,
         [key]: this.state.userInfos[key].value,
      };
      this.props.onEditAuth(data, key);
   };

   reviewPasswordHandler = (key) => {
      const updateInfos = reviewPassword(key, this.state.userInfos);
      this.setState({ userInfos: updateInfos });
   };

   canClick = (key) => {
      // If input is value
      // return true
      return this.state.userInfos[key].isValid;
   };

   render() {
      let infoGroup = [];
      let labelsForShow = ["username", "email", "password"];
      for (let key in this.state.userInfos) {
         // If Edit Condition is false
         // Show user info (Username, Email, Password)
         if (!this.state.userInfos[key].editCondition) {
            if (labelsForShow.includes(key)) {
               infoGroup.push(
                  <div key={key} className="Setting__UserInfo__Group">
                     <p className="Setting__UserInfo__Label">
                        {this.state.userInfos[key].label}:
                     </p>
                     <div className="Setting__UserInfo__Data">
                        <p>{this.props[key]}</p>
                        <i
                           className="fas fa-pen"
                           onClick={() => this.toogleInput(key)}
                        ></i>
                     </div>
                  </div>
               );
            }
         } else {
            // Else Edit Condition is true
            // Show input to edit
            infoGroup.push(
               <div className="Setting__UserInfo__ChgInput" key={key}>
                  <p className="Setting__UserInfo__Label">
                     {this.state.userInfos[key].label}:
                  </p>
                  {/* Show Input */}
                  <div className="Setting__UerInfo__InputGroup">
                     <input
                        {...this.state.userInfos[key].elementconfig}
                        value={this.state.userInfos[key].value}
                        onChange={(e) => this.inputChangeHandler(e, key)}
                     />
                     {/* Show review password icon if has */}
                     {this.state.userInfos[key].reviewPwIcon ? (
                        <div
                           className="Setting__UerInfo__InputGroup__ReviewPw"
                           onClick={() => this.reviewPasswordHandler(key)}
                        >
                           {this.state.userInfos[key].reviewPwIcon}
                        </div>
                     ) : null}
                  </div>
                  {/* Show err message */}
                  {this.state.userInfos[key].isTouch &&
                  !this.state.userInfos[key].isValid ? (
                     <label className="Input__ErrorMessage">
                        {this.state.userInfos[key].errMessage}
                     </label>
                  ) : null}
                  {key !== "password" ? (
                     <div className="Setting__UserInfor__ChgInput__Btns">
                        <button onClick={() => this.toogleInput(key)}>
                           Cancel
                        </button>
                        <button
                           onClick={() => this.saveInput(key)}
                           disabled={!this.canClick(key)}
                        >
                           Save
                        </button>
                     </div>
                  ) : null}
               </div>
            );
         }
      }

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
                  <div className="Setting__UserInfo">{infoGroup}</div>
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
      password: "******",
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
