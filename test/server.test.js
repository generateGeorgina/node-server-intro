// import built-in test module
const test = require("node:test");
const assert = require("node:assert");
// import server module
const server = require("../server.js");
// import PORT
const PORT = require("../index.js");

test("the test works", () => {
  assert.equal(1, 1);
});

// async function here so that Node knows to wait for any promises to resolve
test("home route returns expected page", async () => {
  // listent to any requests sent to port 9876
  const app = server.listen(9876);
  //   use fetch to make HTTP requests, use await to wait for server to respond
  const response = await fetch("http://localhost:9876");
  //   close the server before the assertions/tests to avoid the server running for ever if the assertion failed - in other words, a failed test, would block the rest of the code (if app.close() is after the failed test, app.close() would not run)
  app.close();
  // see if the response is "ok" i.e. status code 200
  assert.equal(response.status, 200);

  // fetch body by using the .text() method
  const body = await response.text();
  //   see if raw text response is as expected
  //   assert.equal(body, "hello");
  //   assert.match method matches the regular expression "/Hello World!" to the body of the response, allowing to check if the body includes a certain substring
  assert.match(body, /Hello World!/);
});
// SyntaxError: await is only valid in async functions and the top level bodies of modules - make sure to add async just before the annonymous function
test("./uh-oh route returns expected page and response status", async () => {
  // Importing the port as an enviroment variable and using it as a vairable didn't work so I had to hard code the port
  const app = server.listen(8081, () =>
    //   PORT returns [object Object]
    console.log(`Listening at http://localhost:${PORT}`)
  );
  const response = await fetch(`http://localhost:8081/uh-oh`);

  app.close();
  assert.equal(response.status, 500);
  const body = await response.text();
  assert.equal(body, "something went wrong");
});

// test("/uh-oh route returns error message", async () => {
//   const app = server.listen(9876);
//   const response = await fetch("http://localhost:9876/uh-oh");
//   app.close();

//   assert.equal(response.status, 500);
//   const body = await response.text();
//   assert.equal(body, "something went wrong");
// });

test("test to see if user recieves a confirmation with the user's reponse in the body of the text", async () => {
  const app = server.listen(9874);
  // In a form, if there is an input with the name attribute set to "keyword" and the user enters "bananas"
  const response = await fetch("http://localhost:9874/search?keyword=bananas");
  app.close();
  assert.equal(response.status, 200);

  //   body = await response.text();
  //   assert.match(body, /You searched for bananas/);
});

test("return 404 response to undefined routes", async () => {
  const app = server.listen(5555);
  const response = await fetch("http://localhost:5555/asdfg");
  app.close();
  assert.equal(response.status, 404);

  const body = await response.text();
  assert.match(body, /Not found/);
});

// writing a test for post handler, since it is not easy to see it working without creating a HTML form
test("/submit route responds to POST requests", async () => {
  const app = server.listen(4444);
  const response = await fetch("http://localhost:4444/submit", {
    method: "POST",
    body: "name=oli",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  console.log(body);
  assert.match(body, /thanks for submitting, oli/);
});

test("/submit/success route responds to POST requests from /submit redirect", async () => {
  const app = server.listen(8888);

  const response = await fetch("http://localhost:8888/submit", {
    method: "POST",
    body: "name=oli",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  // response from /submit is a redirect and response.url takes us to /submit/success/
  const response2 = await fetch(`${response.url}`);
  app.close();

  assert.equal(response2.status, 200);
  const body = await response2.text();
  assert.match(body, /thanks for submitting, oli/);
});
