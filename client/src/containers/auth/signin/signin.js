import React, { Component } from "react";
import { connect } from "react-redux";
import "../auth.css";
import AuthInput from "../../../components/UI/AuthInput/AuthInput";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/action/rootActions";
import {
   checkValidation,
   canClickBtn,
   reviewPassword,
} from "../../../util/helper";

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
            reviewPwIcon: <i className="far fa-eye"></i>,
            label: "Password",
            value: "",
            isValid: false,
         },
      },
      errMsg: "",
   };

   componentDidUpdate(preState, preProps) {
      if (this.state !== preState) {
         console.log("[signin.js] componentDidUpdate");
         return true;
      } else {
         return false;
      }
   }

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updatesignInForm = { ...this.state.signInForm };
      updatesignInForm[key].value = value;
      updatesignInForm[key].isTouch = true;
      updatesignInForm[key].isValid = checkValidation(
         value,
         updatesignInForm[key].validation
      );
      this.setState({ signInForm: updatesignInForm });
   };

   reviewPassword = (key) => {
      const updateForm = reviewPassword(key, this.state.signInForm);
      this.setState({ signInForm: updateForm });
   };

   submitHandler = (event) => {
      event.preventDefault();
      let data = {};
      for (let key in this.state.signInForm) {
         data[key] = this.state.signInForm[key].value;
      }
      this.props.onSignIn(data, this.props);
   };

   swapAuth = () => {
      this.props.history.push("/auth/signup");
   };

   render() {
      if (this.props.token && this.props.token !== "null") {
         this.props.history.push("/");
         this.props.onFlash("You already signed in", "success");
      }
      let input = [];
      for (let key in this.state.signInForm) {
         input.push(
            <AuthInput
               key={key}
               elementtype={this.state.signInForm[key].elementtype}
               elementconfig={this.state.signInForm[key].elementconfig}
               label={this.state.signInForm[key].label}
               reviewPwIcon={this.state.signInForm[key].reviewPwIcon}
               value={this.state.signInForm[key].value}
               touched={this.state.signInForm[key].isTouch}
               invalid={!this.state.signInForm[key].isValid}
               errMsg={this.state.signInForm[key].errMsg}
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
                  <div className="col col-12 col-md-12 col-lg-6">
                     <div className="AuthForm">
                        <h1>SIGN IN</h1>
                        <form onSubmit={(e) => this.submitHandler(e)}>
                           {input}
                           <div className="authBtn">
                              <button
                                 padding="9px 20px"
                                 disabled={!canClickBtn(this.state.signInForm)}
                              >
                                 Sign In
                              </button>
                           </div>
                        </form>
                        <div className="Auth__Warning">
                           <p>* This is only for admins.</p>
                        </div>
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
                  <div className="col-12 col-md-12 col-lg-6 d-none d-lg-block ">
                     <div className="Signup_right">
                        <div className="signin_bg"></div>
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
      authErrMsg: state.auth.authErrMsg,
      token: state.auth.token,
   };
};

const dispatchtoProps = (dispatch) => {
   return {
      onSignIn: (data, props) => dispatch(actions.onSignIn(data, props)),
      onFlash: (flashMsg, flashType) =>
         dispatch(actions.onFlash(flashMsg, flashType)),
   };
};

export default connect(stateToProps, dispatchtoProps)(SignUp);
