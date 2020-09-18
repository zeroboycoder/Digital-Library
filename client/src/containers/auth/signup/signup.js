import React, { Component } from "react";
import { connect } from "react-redux";
import "../auth.css";
import AuthInput from "../../../components/UI/AuthInput/AuthInput";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/action/rootActions";

class SignUp extends Component {
   state = {
      signUpForm: {
         username: {
            elementtype: "input",
            elementconfig: {
               type: "text",
            },
            validation: {
               isRequired: true,
            },
            label: "Username",
            value: "",
            isValid: false,
            errMsg: "Username is required",
         },
         email: {
            elementtype: "input",
            elementconfig: {
               type: "email",
            },
            validation: {
               isRequired: true,
               isEmail: true,
            },
            label: "Email",
            value: "",
            isValid: false,
            errMsg: "Email isn't vaild!",
         },
         password: {
            elementtype: "input",
            elementconfig: {
               type: "password",
            },
            validation: {
               isRequired: true,
               minLength: 6,
            },
            reviewPwIcon: <i className="far fa-eye"></i>,
            label: "Password",
            value: "",
            isValid: false,
            errMsg: "Password have minimun 6 characters",
         },
         c_password: {
            elementtype: "input",
            elementconfig: {
               type: "password",
            },
            validation: {
               isRequired: true,
               isMatch: true,
            },
            reviewPwIcon: <i className="far fa-eye"></i>,
            label: "Confirm Password",
            value: "",
            isValid: false,
            errMsg: "Password doesn't match",
         },
      },
   };

   checkValidation = (value, rules) => {
      let valid = false;
      if (rules.isRequired) {
         valid = value.trim() !== "";
      }

      if (rules.isEmail) {
         const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
         valid = pattern.test(value);
      }

      if (rules.minLength) {
         valid = value.length >= rules.minLength;
      }

      if (rules.isMatch) {
         const password = this.state.signUpForm.password.value;
         valid = password === value;
      }
      return valid;
   };

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updateSignupForm = { ...this.state.signUpForm };
      updateSignupForm[key].value = value;
      updateSignupForm[key].isTouch = true;
      updateSignupForm[key].isValid = this.checkValidation(
         value,
         updateSignupForm[key].validation
      );
      this.setState({ signUpForm: updateSignupForm });
   };

   reviewPassword = (key) => {
      const updatesignUpForm = { ...this.state.signUpForm };
      if (updatesignUpForm[key].elementconfig.type === "password") {
         updatesignUpForm[key].elementconfig.type = "text";
         updatesignUpForm[key].reviewPwIcon = (
            <i className="far fa-eye-slash"></i>
         );
      } else {
         updatesignUpForm[key].elementconfig.type = "password";
         updatesignUpForm[key].reviewPwIcon = <i className="far fa-eye"></i>;
      }
      this.setState({ signUpForm: updatesignUpForm });
   };

   canClick = () => {
      let canClick = true;
      for (let key in this.state.signUpForm) {
         canClick = this.state.signUpForm[key].isValid && canClick;
      }
      return canClick;
   };

   submitHandler = (event) => {
      event.preventDefault();
      let data = {};
      for (let key in this.state.signUpForm) {
         data[key] = this.state.signUpForm[key].value;
      }
      this.props.onSignUp(data, this.props);
   };

   swapAuth = () => {
      this.props.history.push("/auth/signin");
   };

   render() {
      let input = [];
      for (let key in this.state.signUpForm) {
         input.push(
            <AuthInput
               key={key}
               elementtype={this.state.signUpForm[key].elementtype}
               elementconfig={this.state.signUpForm[key].elementconfig}
               label={this.state.signUpForm[key].label}
               reviewPwIcon={this.state.signUpForm[key].reviewPwIcon}
               value={this.state.signUpForm[key].value}
               touched={this.state.signUpForm[key].isTouch}
               invalid={!this.state.signUpForm[key].isValid}
               errMsg={this.state.signUpForm[key].errMsg}
               reviewPassword={() => this.reviewPassword(key)}
               changed={(e) => this.inputChangeHandler(e, key)}
            />
         );
      }

      let auth;
      // If auth loading
      if (this.props.loading) {
         auth = <Spinner />;
      } else {
         // Else
         auth = (
            <div className="Auth">
               <div className="row">
                  <div className="col col-12 col-md-6">
                     <div className="AuthForm">
                        <h1>Registration</h1>
                        <form onSubmit={(e) => this.submitHandler(e)}>
                           {input}
                           <div className="authBtn">
                              <button disabled={!this.canClick()}>
                                 Sign up
                              </button>
                           </div>
                        </form>
                        <div className="SwapAuth">
                           <span>
                              Have you already account?{" "}
                              <span
                                 onClick={this.swapAuth}
                                 className="SwapAuthBtn"
                              >
                                 Sign In
                              </span>
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 col-md-6 d-none d-md-block ">
                     <div className="Signup_right">
                        <div className="signup_bg"></div>
                     </div>
                  </div>
               </div>
            </div>
         );
      }
      return auth;
   }
}

const stateToProps = (state) => {
   return {
      loading: state.auth.authLoading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onSignUp: (data, props) => dispatch(actions.onSignUp(data, props)),
   };
};

export default connect(stateToProps, dispatchToProps)(SignUp);
