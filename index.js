import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({ // we construct the Client class under pg
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "admin",
  port: 5432
});

db.connect(); //this will start the database connection above. 

let quiz = [
  { country: "France", capital: "Paris" }, //this will be the first random questions when we access the website for the first time
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

db.query("SELECT * FROM capitals", (err, res) => { //select all the records under capitals table
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows; //receive all the raws under the capitals table. quiz will be replaced by this query 
  }
  db.end(); //this will end our query
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim(); //if we have empty spaces in the input, this will delete them
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) { //make all the answers lower case
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
