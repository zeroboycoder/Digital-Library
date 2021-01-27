const route = require("express").Router();
const E_Lib_Controller = require("../../controllers/elibcontroller");
const requestController = require("../../controllers/requestController");

// Fetch ebooks api (Programmatically)
route.get("/api/ebooks/fetch", E_Lib_Controller.fetchEbooks);

// Search Ebook by category
route.get("/categories/:searched_category", E_Lib_Controller.fetchEbooks);

// Search Ebook by category and type
route.get("/categories/:searched_category/:type", E_Lib_Controller.fetchEbooks);

// Search Ebook by Input Name (Programmatically)
route.get("/api/ebooks/searched", E_Lib_Controller.fetchEbooks);

// Get Ebook detail page
route.get("/ebooks/:book_id", E_Lib_Controller.getDetailOfEbook);

// Add Ebooks api (Programmatically)
route.post("/api/ebooks/add", E_Lib_Controller.addEbooks);

// Delete Ebooks
route.delete(
   "/api/ebooks/delete/:bookId/:bookCoverName/:pdfName",
   E_Lib_Controller.deleteEbook
);

// Book Request
route.post("/api/ebooks/request", requestController.bookRequest);

// Website Feedback
route.post("/api/feedback", requestController.feedback);

module.exports = route;
