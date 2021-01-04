const http = require('http')

//create server object
http.createServer((req, res)=>{
    //wrtie response
    res.write('Hello World')
    res.end()
}).listen(5003,()=>{console.log('server running')})