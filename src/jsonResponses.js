// sends an object based on mime type
const respondJSON = (request, response, status, object, type) => {
  response.writeHead(status, { "Content-Type": type });
  response.write(object);
  response.end();
};

// function to show a success status code and what message to send
const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "This is a successful response"
  };

  // if the mime type is xml, send back a 200 status response with appropriate XML response
  if (acceptedTypes[0] === "text/xml") {
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    console.log(responseXML);
    return respondJSON(request, response, 200, responseXML, "text/xml");
  }

  const responseObj = JSON.stringify(responseJSON);
  console.log(responseObj);
  return respondJSON(request, response, 200, responseObj, "application/json");
};

// function to show a bad request without correct parameters
const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "This request has the required parameters"
  };

  let responseXML;
  let responseObj;

  // if the mime type is xml
  if (acceptedTypes[0] === "text/xml") {
    // if the parameter is not valid or is not equal to "true", send back the correct xml response
    if (!params.valid || params.valid !== "true") {
      responseJSON.message = "Missing valid query parameter set to true";
      responseJSON.id = "badRequest";
      responseXML = "<response>";
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respondJSON(request, response, 400, responseXML, "text/xml");
    }

    responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 200, responseXML, "text/xml");
  }

  // if the mime type is json, check for the validity of the param and send
  // back an appropriate response
  if (!params.valid || params.valid !== "true") {
    responseJSON.message = "Missing valid query parameter set to true";
    responseJSON.id = "badRequest";
    responseObj = JSON.stringify(responseJSON);
    return respondJSON(request, response, 400, responseObj, "application/json");
  }
  responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, responseObj, "application/json");
};

// function to show not found message
const notFound = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "The page you are looking for was not found.",
    id: "notFound"
  };

  if (acceptedTypes[0] === "text/xml") {
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 404, responseXML, "text/xml");
  }

  const responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 404, responseObj, "application/json");
};

// function that checks for loggedIn parameter and if loggedIn is not set to yes,
// send back the appropriate response
const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "You have successfully viewed the content."
  };

  let responseXML;
  let responseObj;

  if (acceptedTypes[0] === "text/xml") {
    if (!params.loggedIn || params.loggedIn !== "yes") {
      responseJSON.message = "Missing loggedIn query parameter set to yes";
      responseJSON.id = "unauthorized";
      responseXML = "<response>";
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respondJSON(request, response, 401, responseXML, "text/xml");
    }

    responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 200, responseXML, "text/xml");
  }

  if (!params.loggedIn || params.loggedIn !== "yes") {
    responseJSON.message = "Missing loggedIn query parameter set to yes";
    responseJSON.id = "unauthorized";
    responseObj = JSON.stringify(responseJSON);
    return respondJSON(request, response, 401, responseObj, "application/json");
  }
  responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, responseObj, "application/json");
};

// function to show a forbidden error
const forbidden = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "You do not have access to this content.",
    id: "forbidden"
  };

  if (acceptedTypes[0] === "text/xml") {
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 403, responseXML, "text/xml");
  }

  const responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 403, responseObj, "application/json");
};

// function to show internal server error
const internal = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: "Internal Server Error. Something went wrong.",
    id: "internalError"
  };

  if (acceptedTypes[0] === "text/xml") {
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 500, responseXML, "text/xml");
  }

  const responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 500, responseObj, "application/json");
};

// function to display error for a page that has not been implemented yet
const notImplemented = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message:
      "A get request for this page has not been implemented yet. Check again later for updated content.",
    id: "notImplemented"
  };

  if (acceptedTypes[0] === "text/xml") {
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respondJSON(request, response, 501, responseXML, "text/xml");
  }

  const responseObj = JSON.stringify(responseJSON);
  return respondJSON(request, response, 501, responseObj, "application/json");
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented
};
