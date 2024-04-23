// Built-in & 3rd party modules

// const fs = require("node:fs");
// fs.readFile("my-file.txt");

// accessing modules installed via npm
const express = require("express");

// creating a new server object
const server = express();

// bodies can be large and form data can be sent in small chucks
// Express includes parsers for different formats eg. JSON, form submission
// urlencoded is a parser for what HTML forms send by default, which adds a request.body propety turning user data into an object
const bodyParser = express.urlencoded();

module.exports = server;

// static handler for style sheet in public - the server will not modify these files i.e. change for each request hence "static files"
// static handler needs to be declared and initialised before adding static files from public folder
const staticHandler = express.static("public");
// there will be no "public" in the URL, in this case it will be localhost:<port>/style.css. Express serves files from the route of the site
server.use(staticHandler);

// You can put the above in a function, since route methods like ".get" accept multiple functions
function logger(request, response, next) {
  // logs "logger"
  console.log("logger");
  // logs "GET /"
  console.log(request.method + " " + request.url);
  next();
}

// Express calls don't send a response "middleware", this will log "GET /" when any page is loaded
// Without middleware, the logger function would need to be added to every route
server.use(logger);

// adding a "route" - a function that will be run whenever the server recieves a HTTP GET request for the home path
// server.get("/", (request, response) => {
//   response.send("hello");
// });

// // using the status method on the response object to set a status code, other than the defaults
// // this is at the path localhost:${PORT}/uh-oh
// server.get("/uh-oh", (request, response) => {
//   response.status(500);
//   response.send("something went wrong");
// });
//  shorter version
server.get("/uh-oh", (request, response) => {
  response.status(500).send("something went wrong");
});

// Middleware 'next' argument
// Visiting root/home will log "GET /" to your terminal
// server.get("/", (request, response, next) => {
//   console.log(request.method + " " + request.url);
//   next();
// });

// You can return a HTML response, as oppposed to a plain text response
server.get("/", (request, response) => {
  const year = new Date().getFullYear();
  response.send(`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Home</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Hello World, it's ${year}!</h>
    </body>
  </html>
  `);
});

// // route methods like ".get" accept multiple handler functions, as demonstrated with the "logger" function
// server.get("/", logger, (request, response) => {
//   response.send(`
//   <!doctype html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Home</title>
//     </head>
//     <body>
//       <h1>Hello World!</h>
//     </body>
//   </html>
//   `);
// });

// implementing a route (a function that will be run whenever the server recieves a HTTP request) for
server.get("/search", (request, response) => {
  // Accessing the URL's search parameters (the stuff after the "?") by using the request.query object. Each key=value pair is parsed and represented as a property
  const keyword = request.query.keyword;
  response.send(`<p>You searched for ${keyword}</p>`);
});

// any value can match ":name", those matched values can be access via the request.params object
server.get("/users/:name", (request, response) => {
  // This creates a params object like { "name": "oli" }
  const name = request.params.name;
  response.send(`<h1>Hello ${name}</h1>`);
});

// post handler to deal with forms submitting user data to server
// urlencoded is a parser for what HTML forms send by default, which adds a request.body propety turning user data into an object
server.post("/submit", bodyParser, (request, response) => {
  // Express includes parsers for different formats eg. JSON, form submission, here we use form submission
  const name = request.body.name;
  // response.send(`thanks for submitting, ${name}`);

  // redirect to a confirmation page removes the chance of the user submitting data twice to the server on page refresh
  response.redirect(`/submit/success?name=${name}`);
});

// passing in user submitted data from /submit to confirmation page /submit/success
server.get("/submit/success", (request, response) => {
  // the request will come from /submit which will hold the user submitted data in its url "?name=oli"
  const name = request.query.name;
  response.send(`<p>thanks for submitting, ${name}</p>`);
});

// catch-all handler if after all routes above this block of code is not matched, server.use matches any handler or route (that's why it is place last to catch the undefined routes)
server.use((request, response) => {
  response.status(404).send(`<h1>Not found</h1>`);
});
