// imports using CommonJS

// const whateverNameWeWant = require("./messages.js")

// console.log(whateverNameWeWant);
// console.log(message2);

// using CommonJS object destructuring
// const { message1, message2 } = require("./messages.js");
const messages = require("./messages.js");
const { response } = require("./server.js");
console.log(messages.message1);
console.log(messages.message2);

// since index.js is our named "entrypoint", we will import the server here so it can start the server

const server = require("./server.js");
// listen for any requests sent to port 3000 - type control + C to stop the Node process
// server.listen(3000, () => console.log("Listening at http://localhost:3000"));
server.listen(9875);
// server.listen(9874);

// Access enviroment variable as described in README.md
// console.log(process.env.TEST);

// set up PORT as an Environment Variable and avoid hard-coding - remember the EV is set via the terminal (or hosting provider) just before running the node enviornment
// default to port 3000 if PORT environment variable is not decarled
// const PORT = process.env.PORT || 3000;
// This enables hosting providers to start a server using a random available port
// server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
// Listens to "route" i.e. server response/request
// server.listen(PORT);

// export PORT for tests - didn't get it working
// module.exports = PORT;

// setting HTTP headers, normally if you send a reponse.send and your value is a string, your header will set content-type to text/html and content-length and to the size of the string
// set one header
// response.set("x-fake-header", "my-value");
// // set multiple headers using an object
// response.set({
//   "x-fake-header": "my-value",
//   "x-another-header": "another-value",
// });
