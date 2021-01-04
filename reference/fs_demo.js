const fs = require("fs");
const path = require("path");

//write to a file
fs.writeFile(path.join(__dirname, "/test", 'hello.txt'), "hello world", (err) => {
  if (err) throw err;
  console.log('file written to...')
  //append file
  fs.appendFile(path.join(__dirname, "/test", 'hello.txt'), "i love node.js", (err) => {
    if (err) throw err;
    console.log('file written to...')
  });
});

//read content of a file
fs.readFile(path.join(__dirname, "/test", 'hello.txt'),'utf8',(err,data) => {
    if (err) throw err;
    console.log(data)
  });

//rename file
  fs.rename(path.join(__dirname, "/test", 'hello.txt'), path.join(__dirname, "/test", 'helloworld.txt'), (err) => {
    if (err) throw err;
    console.log('file renamed...')
  });
