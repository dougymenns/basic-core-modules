const fs = require("fs");
const path = require("path");
const http = require("http");
const Logger = require("./logger");

// fs.writeFile(path.join(__dirname, "/test", 'hello.txt'), "hello world", (err) => {
//   if (err) throw err;
//   console.log('file written to...')
//   //append file
//   fs.appendFile(path.join(__dirname, "/test", 'hello.txt'), "i love node.js", (err) => {
//     if (err) throw err;
//     console.log('file written to...')
//   });
// });

// fs.readFile(path.join(__dirname, "/test", 'hello.txt'),'utf8',(err,data) => {
//     if (err) throw err;
//     console.log(data)
//   });

//rename file
//   fs.rename(path.join(__dirname, "/test", 'hello.txt'), path.join(__dirname, "/test", 'helloworld.txt'), (err) => {
//     if (err) throw err;
//     console.log('file renamed...')
//   });

// const logger = new Logger()

// logger.on('message', (data)=>{console.log("Called Listener:,",data)})
// logger.log('Hello World')

const server = http.createServer((req, res) => {
// uncomment the code below to experience core http server request

  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  //   console.log(req.url);
  // }
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  //   console.log(req.url);
  // }

  // if (req.url === "/api/users") {
  //   const users = [
  //     { name: "Douglas Mensah", age: 40 },
  //     { name: "Raymond Mensah", age: 30 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  //below is the production like structure of http

  //build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  
  //extension of file
  let extname = path.extname(filePath);

  //initial content type
  let contentType = "text/html";

  //check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  //read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENONET") {
        //page not found
        fs.readFile(
          path.join(__dirname, "public", "error.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      }else {
      //some server error
      res.writeHead(500);
      res.end(`Server Error ${err.code}`);
    }
    } else{
      //success
      res.writeHead(200,{ "Content-Type": contentType })
      res.end(content, "utf-8");

    }
  });
});
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
