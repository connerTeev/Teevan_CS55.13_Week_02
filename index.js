//loading core nodeJS http module
const http = require("http");

//loadding core nodeJS filesystem module using the promises methods only
const fs = require("fs").promises;

//declaring a function to respond to HTTP requests
const requestListener = (req,res) => {
  console.log(req.url);
  //checking if request url is root address, then return HTML
  if(req.url === "/") {
    fs.readFile(__dirname + "/post.html")
      .then(
        contents => {
          //setting HTTP header content type
          res.setHeader("Content-Type", "text/html; charset=UTF-8");
          //adding an OK status cod to HTTP head
          res.writeHead(200);
          //ending response and sending the contents 
          res.end(contents);
        }
      )
  } else {
    // else the url is not root, then return JSON
    fs.readFile(__dirname + "/data.json")
      .then(
        contents => {
          //setting header type
          res.setHeader("Content-Type", "application/json");
          //writing header status
          res.writeHead(200);
          //ending and submitting
          res.end(contents)
        }
      )
  }
};

// creating an http server instance
const server = http.createServer(requestListener);

//defining TCP port and IP address for the HTTP server to listen to
const host = "127.0.0.1"; // being localhost for our device
const port = "3000"; // typical node port

//invoking the listen method starting listening to HTTP requests
server.listen(
  port,
  host,
  () => {
   console.log(`Server is running on port: ${port}`)
  }
)