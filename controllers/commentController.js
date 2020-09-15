const EbookData = require("../model/ebookModel");

exports.addComment = (req, res, next) => {
   const book_id = req.params.book_id;
   const { email, comment } = req.body;
   EbookData.findById(book_id)
      .then((ebook) => {
         // If there's no ebook
         if (!ebook) return res.status(404).json({ errMsg: "No Ebook Found" });
         // else there's ebook
         ebook.comments.push({ email, comment });
         ebook
            .save()
            .then((newEbook) =>
               res.status(200).json({ cmt: newEbook.comments })
            );
      })
      .catch((err) =>
         res.status(500).json({ errMsg: "Internal Server Error" })
      );
};
