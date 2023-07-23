const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const submitResponse = require("./submitResponse");

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom route for /submit-response
server.post("/submit-response", submitResponse);

server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
