module.exports = function (app, database) {
  // get preference list
  app.get("/preflist", (request, result) => {
    database
      .collection("students")
      .findOne(
        { id: request.query.id },
        { projection: { prefList: true, group: true, _id: false } },
        (err, list) => {
          if (err) result.send(err);
          else result.send(list);
        }
      );
  });

  // update preference list
  app.put("/preflist", (request, result) => {
    database
      .collection("students")
      .updateOne(
        {
          id: request.query.id,
          password: request.query.password,
        },
        {
          prefList: request.query.prefList,
        }
      )
      .toArray((err, res) => {
        if (err) result.send(err);
        else result.send("successfully updated");
      });
  });

  // get password
  app.get("/login", (request, result) => {
    database
      .collection("students")
      .findOne(
        { id: request.query.id },
        { projection: { password: 1, _id: 0 } },
        (err, pwd) => {
          if (err) result.send(err);
          else result.send(pwd);
        }
      );
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

  //general
  app.get("/", (request, result) => {
    result.send("Hi there!!! This API is working");
  });

  // temporary
  // add student data
  app.post("/students", (request, result) => {
    let studData = request.body;
    console.log(studData);
    database.collection("students").insertOne(studData, (err, res) => {
      if (err) result.send(err);
      else result.send(res);
    });
  });
};
