import React, { Component } from "react";
import { connect } from "react-redux";
import "../auth.css";
import AuthInput from "../../../components/UI/AuthInput/AuthInput";
import * as actions from "../../../store/action/rootActions";

class SignUp extends Component {
   state = {
      signInForm: {
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
            errMsg: "Email isn't valid!",
         },
         password: {
            elementtype: "input",
            elementconfig: {
               type: "password",
            },
            validation: {
               isRequired: true,
            },
            label: "Password",
            value: "",
            isValid: false,
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
      return valid;
   };

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updatesignInForm = { ...this.state.signInForm };
      updatesignInForm[key].value = value;
      updatesignInForm[key].isTouch = true;
      updatesignInForm[key].isValid = this.checkValidation(
         value,
         updatesignInForm[key].validation
      );
      this.setState({ signInForm: updatesignInForm });
   };

   canClick = () => {
      let canClick = true;
      for (let key in this.state.signInForm) {
         canClick = this.state.signInForm[key].isValid && canClick;
      }
      return canClick;
   };

   submitHandler = (event) => {
      event.preventDefault();
      let data = {};
      for (let key in this.state.signInForm) {
         data[key] = this.state.signInForm[key].value;
      }
      this.props.onSignIn(data, this.props);
      this.props.history.replace("/");
   };

   swapAuth = () => {
      this.props.history.replace("/auth/signup");
   };

   render() {
      let input = [];
      for (let key in this.state.signInForm) {
         input.push(
            <AuthInput
               key={key}
               elementtype={this.state.signInForm[key].elementtype}
               elementconfig={this.state.signInForm[key].elementconfig}
               label={this.state.signInForm[key].label}
               value={this.state.signInForm[key].value}
               touched={this.state.signInForm[key].isTouch}
               invalid={!this.state.signInForm[key].isValid}
               errMsg={this.state.signInForm[key].errMsg}
               changed={(e) => this.inputChangeHandler(e, key)}
            />
         );
      }
      return (
         <div className="Auth">
            <div className="row">
               <div className="col col-12 col-md-6">
                  <div className="AuthForm">
                     <h1>Login</h1>
                     <form onSubmit={(e) => this.submitHandler(e)}>
                        {input}
                        <div className="authBtn">
                           <button
                              padding="9px 20px"
                              disabled={!this.canClick()}
                           >
                              Sign In
                           </button>
                        </div>
                     </form>
                     <div className="SwapAuth">
                        <span>
                           Are you new here?{" "}
                           <span
                              onClick={this.swapAuth}
                              className="SwapAuthBtn"
                           >
                              Sign up
                           </span>
                        </span>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 d-none d-md-block ">
                  <div className="Signup_right">
                     <div className="signin_bg"></div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const dispatchtoProps = (dispatch) => {
   return {
      onSignIn: (data, props) => dispatch(actions.onSignIn(data, props)),
   };
};

export default connect(null, dispatchtoProps)(SignUp);
