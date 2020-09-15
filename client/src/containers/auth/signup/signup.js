import React, { Component } from "react";
import { connect } from "react-redux";
import "../auth.css";
import AuthInput from "../../../components/UI/AuthInput/AuthInput";
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
      this.props.history.replace("/");
   };

   swapAuth = () => {
      this.props.history.replace("/auth/signin");
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
               value={this.state.signUpForm[key].value}
               touched={this.state.signUpForm[key].isTouch}
               invalid={!this.state.signUpForm[key].isValid}
               errMsg={this.state.signUpForm[key].errMsg}
               changed={(e) => this.inputChangeHandler(e, key)}
            />
         );
      }
      return (
         <div className="Auth">
            <div className="row">
               <div className="col col-12 col-md-6">
                  <div className="AuthForm">
                     <h1>Registration</h1>
                     <form onSubmit={(e) => this.submitHandler(e)}>
                        {input}
                        <div className="authBtn">
                           <button disabled={!this.canClick()}>Sign up</button>
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
}

const dispatchtoProps = (dispatch) => {
   return {
      onSignUp: (data, props) => dispatch(actions.onSignUp(data, props)),
   };
};

export default connect(null, dispatchtoProps)(SignUp);
