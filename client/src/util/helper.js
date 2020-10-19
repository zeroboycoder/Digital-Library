import React from "react";

// Go to Book Detail
export const clickedLink = (book_id, props) => {
   props.history.push(`/ebooks/${book_id}`);
};

// Search ebook with tag
export const clickTag = (name, categoryName, props) => {
   props.history.push(`/categories/${categoryName}/${name}`);
};

// Review the password
// return update form
export const reviewPassword = (key, form) => {
   const updateForm = { ...form };
   if (updateForm[key].elementconfig.type === "password") {
      updateForm[key].elementconfig.type = "text";
      updateForm[key].reviewPwIcon = <i className="far fa-eye-slash"></i>;
   } else {
      updateForm[key].elementconfig.type = "password";
      updateForm[key].reviewPwIcon = <i className="far fa-eye"></i>;
   }
   return updateForm;
};

// Check can click
// return boolean
export const canClickBtn = (form) => {
   let canClick = true;
   for (let key in form) {
      canClick = form[key].isValid && canClick;
   }
   return canClick;
};

// Check form validation
// return boolean
export const checkValidation = (value, rules, form) => {
   let validResult = false;
   if (value) {
      // if rule has isRequired
      if (rules.isRequired) {
         validResult = value.trim() !== "";
      }
      // if rule has isEmail
      if (rules.isEmail) {
         const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
         validResult = pattern.test(value);
      }
      // if rule has minLength
      if (rules.minLength) {
         validResult = value.length >= rules.minLength;
      }
      // if rule has isMatch
      if (rules.isMatch) {
         const password = form.password.value;
         validResult = password === value;
      }
      // if rule has isNumber
      if (rules.isNumber) {
         const pattern = /^\d+$/;
         validResult = pattern.test(value);
      }
      // if rule has number of array value (in tags)
      if (rules.numberOfArrayValue) {
         const numberOfValue = value.trim().split(" ").length;
         validResult = numberOfValue >= rules.numberOfArrayValue;
      }
      // if rule has isImage
      if (rules.isImage) {
         const pattern = /jpg|jpeg|png/;
         validResult = pattern.test(value.type);
      }
      // if rule has isPdf
      if (rules.ifPdf) {
         const pattern = /.pdf/;
         validResult = pattern.test(value.type);
      }
   }
   return validResult;
};
