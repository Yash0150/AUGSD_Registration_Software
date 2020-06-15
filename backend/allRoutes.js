module.exports = function (app, database) {
  // get preference list
  app.get("/preflist", (request, result) => {
    database
      .collection("students")
      .find({})
      .toArray((err, list) => {
        if (err) result.send(err);
        else result.send(list);
      });
  });

  // update preference list
  app.put("/preflist", (request, result) => {
    database
      .collection("students")
      .updateOne({})
      .toArray((err, res) => {
        if (err) result.send(err);
        else result.send("successfully updated");
      });
  });

  // get password
  app.get("/login", (request, result) => {
    database
      .collection("students")
      .find({})
      .toArray((err, pwd) => {
        if (err) result.send(err);
        else result.send(pwd);
      });
  });

  // update password
  app.put("/login", (request, result) => {
    database
      .collection("students")
      .updateOne({})
      .toArray((err, pwd) => {
        if (err) result.send(err);
        else result.send("succesfully updated");
      });
  });

  // get timetables
  app.get("/tt", (request, result) => {
    database
      .collection("timetable")
      .find({})
      .toArray((err, ttlist) => {
        if (err) result.send(err);
        else result.send(ttlist);
      });
  });

  //general
  app.get("/", (request, result) => {
    result.send("Hi there!!! This API is working");
  });
};
