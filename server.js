// Call the libraries
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

// Create express application
const app = express();

// Setting the app
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Routes
const ebook = require("./routes/api/ebook");
const auth = require("./routes/api/authApi");
const user = require("./routes/api/user");
const comment = require("./routes/api/commentApi");
app.use(ebook);
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/comment", comment);

// Configure For Production
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

// Configure the Mongo DB
const PORT = process.env.PORT || 5000;
// const uri = config.get("MONGO_LOCAL_URI");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.us0iw.mongodb.net/e-library-for-tumlm>?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
   .connect(uri, options)
   .then(
      app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
   )
   .catch((err) => console.log(err));
