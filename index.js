var http = require("http");
const fs = require("fs");
const path = require("path");
const faculty = require("./public/faculty");
const students = require("./public/students");

const dirPath = path.join(__dirname, "/public");

http
  .createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Max-Age", 2592000);

    var url = req.url;
    if (url === "/") {
      const stream = fs.createReadStream(dirPath + "/index.html");
      stream.on("open", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        stream.pipe(res);
      });
      stream.on("error", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Not found");
      });
    } else if (url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(students));
    } else if (url === "/api/students") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(students));
    } else if (url === "/api/faculty") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(faculty));
    }
  })
  .listen(process.env.PORT | 3000, function () {
    console.log("server start at port 3000");
  });
