const server = require("./server.js");
require("dotenv").config();

server.listen((port = process.env.PORT || 5000), () => {
  console.log(`\n Listening on port ${port} \n`);
});
