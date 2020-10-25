const mongoose = require("mongoose");

const ebookSchema = new mongoose.Schema({
   bookName: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   tags: {
      type: Array,
      required: true,
   },
   releasedYear: {
      type: Number,
      required: true,
   },
   pages: {
      type: Number,
      required: true,
   },
   fileSize: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   bookCoverLocation: {
      type: String,
      required: true,
   },
   pdfLocation: {
      type: String,
      required: true,
   },
   comments: {
      type: Array,
   },
});

module.exports = mongoose.model("ebook_datas", ebookSchema);
