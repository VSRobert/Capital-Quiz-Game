Capital Quiz Game.

It's a quiz game created with Express.js, Body-Parser, EJS and PostgreSQL with the help of pgAdmin4 (PostgreSQL administration platform).

You need to install: npm i express ejs body-parser pg
And you need to install also pgAdmin4 (or higher version)

Below is the db with all the details that I used, but of course you can change them as you like in your pgAdmin app.
db = new pg.Client({ // we construct the Client class under pg
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "admin",
  port: 5432
});

db is running on default port 5432 and express server is running on port 3000.

The app is working on all browsers, but if you use Firefox you can use also flags.csv (added in the files, but no used in the code). With this table you can see also the flag of the country that is requested. 
