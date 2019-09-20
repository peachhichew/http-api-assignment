const http = require("http");
const url = require("url");
const query = require("querystring");
const htmlHandler = require("./htmlResponses.js");
const jsonHandler = require("./jsonResponses.js");

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// object that contains url routes followed by specific functions
const urlStruct = {
  GET: {
    "/": htmlHandler.getIndex,
    "/style.css": htmlHandler.getCSS,
    "/success": jsonHandler.success,
    "/badRequest": jsonHandler.badRequest,
    "/unauthorized": jsonHandler.unauthorized,
    "/forbidden": jsonHandler.forbidden,
    "/internal": jsonHandler.internal,
    "/notImplemented": jsonHandler.notImplemented,
    notFound: jsonHandler.notFound
  }
};

// handles http requests
const onRequest = (request, response) => {
  console.log(request.url);
  // parse the url and grab the query parameters
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // grab the 'accept' headers and split them into an array
  const acceptedTypes = request.headers.accept.split(",");

  console.log("params", params);
  console.log("acceptedTypes", acceptedTypes);

  // check if the path name matches anything in the urlStruct
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](
      request,
      response,
      params,
      acceptedTypes
    );
  } else {
    urlStruct[request.method].notFound(
      request,
      response,
      params,
      acceptedTypes
    );
  }
};

// start the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
