// Go to Book Detail
export const clickedLink = (book_id, props) => {
   props.history.push(`/ebooks/${book_id}`);
};

// Search ebook with tag
export const clickTag = (name, categoryName, props) => {
   props.history.push(`/categories/${categoryName}/${name}`);
};

// Check form validation
// return boolean
export const checkValidation = (value, rules) => {
   let validResult = false;
   if (value) {
      // if rule has isRequired
      if (rules.isRequired) {
         validResult = value.trim() !== "";
      }
      // if rule has isNumber
      if (rules.isNumber) {
         const pattern = /^\d+$/;
         validResult = pattern.test(value);
      }
      // if rule has number of array value
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

// Check can click
// return boolean
export const canClickBtn = (form) => {
   let canClick = true;
   for (let key in form) {
      canClick = form[key].isValid && canClick;
   }
   return canClick;
};
