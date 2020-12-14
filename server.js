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
//tells the server to find static files here when looking for linked content
app.use(express.static(path.join(__dirname, "./public")));

//sets up server to start listening
app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

// notes data
let noteData = {
  table: [],
};

// Routes
// ===================================
// Route to the notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// route to get display db.json file
app.get("/api/notes", function (reg, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// wildcard route to send user to "home" page for any unspecified extensions
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Create new note and save to db.json
app.post("/api/notes", function (req, res) {
  //read current contents of db.json
  const noteData = JSON.parse(fs.readFileSync("./db/db.json"));
  let newNote = req.body;
  let noteID = noteData.length.toString();
  newNote.id = noteID;

  //push new note to array
  noteData.push(newNote);

  // save new array to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData, null, 2));

  res.json(noteData);
});
