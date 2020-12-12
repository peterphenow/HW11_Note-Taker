// Dependencies
// ===================================
let express = require("express");

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
