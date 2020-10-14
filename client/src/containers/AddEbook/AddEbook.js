import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddEbook.css";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidation, canClickBtn } from "../../util/helper";
import Flash from "../../components/UI/Flash/Flash";
import * as actions from "../../store/action/rootActions";

class AddEbook extends Component {
   state = {
      uploadedForm: {
         bookName: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Book Name",
            },
            validation: {
               isRequired: true,
            },
            label: "Book Name",
            value: "",
            isValid: false,
            errMsg: "Pleade enter book name which you want to upload.",
         },
         author: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Author",
            },
            validation: {
               isRequired: true,
            },
            label: "Author",
            value: "",
            isValid: false,
            errMsg: "Please enter author of book who you want to upload.",
         },
         tags: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Tags",
            },
            validation: {
               isRequired: true,
               numberOfArrayValue: 3,
            },
            label: "Tags",
            guideLine:
               "You meed to attach minimun 3 tags. Use space between tags.",
            value: "",
            isValid: false,
            errMsg: "Please attach minimun 3 tags.",
         },
         releasedYear: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Released Year",
            },
            validation: {
               isRequired: true,
               isNumber: true,
            },
            label: "Released Year",
            value: "",
            isValid: false,
            errMsg: "Only number are allowed.",
         },
         pages: {
            elementtype: "input",
            elementconfig: {
               type: "text",
               placeholder: "Pages",
            },
            validation: {
               isRequired: true,
               isNumber: true,
            },
            label: "Number of Page",
            value: "",
            isValid: false,
            errMsg: "Only numbers are allowed.",
         },
         bookCover: {
            elementtype: "input",
            elementconfig: {
               type: "file",
            },
            validation: {
               isImage: true,
            },
            label: "Book Cover",
            isValid: false,
            errMsg: "Only image are allowed such as png, jpg, jpeg.",
         },
         ebook: {
            elementtype: "input",
            elementconfig: {
               type: "file",
            },
            validation: {
               ifPdf: true,
            },
            label: "PDF",
            isValid: false,
            errMsg: "Only pdf files are allowed.",
         },
         description: {
            elementtype: "textarea",
            elementconfig: {
               placeholder: "Description",
            },
            validation: {
               isRequired: true,
            },
            label: "Description",
            value: null,
            isValid: false,
            errMsg: "Please write any descriptions you want.",
         },
      },
      selectedImage: null,
      selectedPdf: null,
      previewImage: "",
   };

   // Preview the selected image
   previewImage = (file) => {
      if (file) {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onloadend = () => {
            this.setState({ previewImage: reader.result });
         };
      } else {
         this.setState({ previewImage: null });
      }
   };

   // Input onChange handler
   inputChangeHandler = (event, key, type, label) => {
      // check input is file or not
      // if file
      if (type === "file") {
         // then file is image or pdf
         // if image
         if (label === "Book Cover") {
            const file = event.target.files[0] || null;
            const updateUploadedForm = { ...this.state.uploadedForm };
            updateUploadedForm[key].isTouch = true;
            updateUploadedForm[key].isValid = checkValidation(
               file,
               this.state.uploadedForm[key].validation
            );
            this.setState({
               uploadedForm: updateUploadedForm,
               selectedImage: file,
            });
            this.previewImage(file);
         }
         // if pdf
         if (label === "PDF") {
            const file = event.target.files[0] || null;
            const updateUploadedForm = { ...this.state.uploadedForm };
            updateUploadedForm[key].isTouch = true;
            updateUploadedForm[key].isValid = checkValidation(
               file,
               this.state.uploadedForm[key].validation
            );
            this.setState({
               uploadedForm: updateUploadedForm,
               selectedPdf: file,
            });
         }
      }
      // if not file
      // if the input is normal text input
      else {
         const value = event.target.value;
         const updateUploadedForm = { ...this.state.uploadedForm };
         updateUploadedForm[key].value = value;
         updateUploadedForm[key].isTouch = true;
         updateUploadedForm[key].isValid = checkValidation(
            value,
            this.state.uploadedForm[key].validation
         );
         this.setState({ uploadedForm: updateUploadedForm });
      }
   };

   // Form submit function
   submitHandler = (event) => {
      event.preventDefault();
      const form = new FormData();
      form.append("bookName", this.state.uploadedForm.bookName.value);
      form.append("author", this.state.uploadedForm.author.value);
      form.append("tags", this.state.uploadedForm.tags.value);
      form.append("releasedYear", this.state.uploadedForm.releasedYear.value);
      form.append("pages", this.state.uploadedForm.pages.value);
      form.append("description", this.state.uploadedForm.description.value);
      form.append("files", this.state.selectedImage);
      form.append("files", this.state.selectedPdf);
      this.props.onAddEbook(
         form,
         this.state.uploadedForm.bookName.value,
         this.props
      );
      const updateForm = { ...this.state.uploadedForm };
      for (const key in updateForm) {
         updateForm[key].value = "";
      }
      this.setState({ uploadedForm: updateForm, previewImage: "" });
   };

   render() {
      // Flash Message
      let flashMessage;
      if (this.props.flashMsg && !this.props.loading) {
         flashMessage = (
            <Flash message={this.props.flashMsg} type={this.props.flashType} />
         );
      }

      let inputs = [];
      for (let key in this.state.uploadedForm) {
         inputs.push(
            <Input
               key={key}
               elementtype={this.state.uploadedForm[key].elementtype}
               elementconfig={this.state.uploadedForm[key].elementconfig}
               label={this.state.uploadedForm[key].label}
               guideLine={this.state.uploadedForm[key].guideLine}
               value={this.state.uploadedForm[key].value}
               touched={this.state.uploadedForm[key].isTouch}
               invalid={!this.state.uploadedForm[key].isValid}
               errMsg={this.state.uploadedForm[key].errMsg}
               previewImage={this.state.previewImage}
               changed={(e) =>
                  this.inputChangeHandler(
                     e,
                     key,
                     this.state.uploadedForm[key].elementconfig.type,
                     this.state.uploadedForm[key].label
                  )
               }
            />
         );
      }
      const form = (
         <form onSubmit={(e) => this.submitHandler(e)}>
            {inputs}
            <div className="AddEbook__Btn">
               <button
                  type="submit"
                  className="SubmitBtn"
                  disabled={!canClickBtn(this.state.uploadedForm)}
               >
                  Upload
               </button>
            </div>
         </form>
      );

      let addEbook;
      if (this.props.loading) {
         addEbook = <Spinner />;
      } else {
         addEbook = (
            <div className="AddEbook">
               <h1 className="AddEbook__Heading">Which Book U Wanna Share</h1>
               <div className="AddEbook__Form">{form}</div>
            </div>
         );
      }
      return (
         <React.Fragment>
            {flashMessage}
            {addEbook}
         </React.Fragment>
      );
   }
}

const stateToProps = (state) => {
   return {
      loading: state.ebook.loading,
      flashMsg: state.flash.flashMsg,
      flashType: state.flash.flashType,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onAddEbook: (data, bookName) =>
         dispatch(actions.onAddEbook(data, bookName)),
   };
};

export default connect(stateToProps, dispatchToProps)(AddEbook);
