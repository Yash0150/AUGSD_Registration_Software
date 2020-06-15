module.exports = function (app, database) {
  app.get("/", (request, result) => {
    result.send("Hi there!!! This API is working");
  });
};
