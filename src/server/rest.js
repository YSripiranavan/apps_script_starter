const doGet = (e) => {
  return Response().json({
    message: 'Hello, World!',
  });
};
global.doGet = doGet;

const doPost = (e) => {
  // to get the parameters from the POST request
  let params = {};
  if (e.parameters !== undefined) {
    params = e.parameters;
  }
  return Response().json({
    message: 'Hello, World!',
    params,
  });
};
global.doPost = doPost;

function Response() {
  return {
    json: (data) => {
      return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
        ContentService.MimeType.JSON
      );
    },
  };
}
global.Response = Response;
