import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let notes = []; 

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/start", (req, res) => {
  res.render("home.ejs", { notes }); 
});

app.post("/add", (req, res) => {
  const noteText = req.body.note;
  const color = req.body.color;

  if (noteText && color) {
    notes.push({ text: noteText.trim(), color });
  }

  res.redirect("/start");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  if (index !== undefined && notes[index]) {
    notes.splice(index, 1); 
  }
  res.redirect("/start");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
