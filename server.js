// Dependencies
// ===================================
let express = require("express");
let path = require("path");
let fs = require("fs");

// Set up the express app
// ===================================
let app = express();
let PORT = process.env.PORT || 3001;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sets up server to start listening
app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

// Routes
// ===================================
// Route to the notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// wildcard route to send user to "home" page
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
