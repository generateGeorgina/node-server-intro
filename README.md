Terminal commands - everytime you make a change, you need to quit and restart the server
node index.js to start the Node process
control + C to stop the Node process

While in Node process
curl localhost:3000 to send GET request to port 3000

Run the test file - you must terminate the Node process
node test/server.test.js

Run all tests in Node, which are located in the "test" folder and/or ending in ".test.js" (You must terminate the Node process)
node --test

Create an enviroment variable, so hosting providers can tell your server which port to listen to, instead of hard-coding it for example localhost:3000
For Unix - TEST=123 node index.js
For Windows - SET TEST=123 & node index.js

Enviroment vairable are accessed via process.env (which is a global object)
console.log(process.env.TEST);

// Importing the port as an enviroment variable and using it as a vairable didn't work so I had to hard code the port

Going to http://localhost:3000/search?keyword=css will print "You search for css" as written in server.js > server.get > response.send
