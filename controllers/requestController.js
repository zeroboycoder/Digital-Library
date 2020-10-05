const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const authMdodel = require("../model/authModel");

const mail = async (recipientMail, content) => {
   const options = {
      auth: {
         api_user: "pyaesonekhant@tumawlamyine.edu.mm",
         api_key: "Py@esonekh@nt270",
      },
   };

   const mailer = nodemailer.createTransport(sgTransport(options));

   const email = {
      to: recipientMail,
      from: "pyaesonekhant@tumawlamyine.edu.mm",
      subject: "Request Book",
      html: content,
   };

   await mailer.sendMail(email);
};

// Book Request
exports.bookRequest = (req, res) => {
   const { bookName, major } = req.body;
   // First find the user base on major
   authMdodel
      .findOne({ major: major })
      .then((user) => {
         if (!user) {
            return res.status(400).json({ errMsg: "User not found" });
         }
         // If found user
         // then send email the bookname to that user(major admin)
         const email = user.email;
         const content = `Can you upload this book : <b>"${bookName}"</b>.`;
         mail(email, content)
            .then(() => res.status(200).json({ msg: "success" }))
            .catch((err) =>
               res.status(400).json({ errMsg: "Can't send email" })
            );
      })
      .catch((err) =>
         res.status(400).json({ errMsg: "Fail in search user with major" })
      );
};

// Website Feedback
exports.feedback = (req, res) => {
   const { feedbackMsg } = req.body;
   const email = "pyaesonekhant@tumlm.edu.mm";
   const content = `Hey guy, User send this feedback. <br /> <strong>"${feedbackMsg}"</strong>`;
   mail(email, content)
      .then(() => res.status(200).json({ msg: "success" }))
      .catch((err) => res.status(400).json({ errMsg: "Can't send email" }));
};
