module.exports = function (app, database) {
  const ref_id = null;
  /** get preference list
   *
   * @param {string} id, student id
   * @returns {object} prefList, group; preference list and group(ws/eg)
   */

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

  /** update preference list
   *
   * @param {string} id, student id
   * @param {string} password, password for the student
   * @param {Array} prefList, prefList,
   *
   *                  ///// is stored in reverse order //////
   *
   * @returns {string} success, if operation is successful
   */

  app.put("/preflist", (request, result) => {
    database
      .collection("students")
      .updateOne(
        { id: request.body.id, password: request.body.pwd },
        { $set: { prefList: request.body.prefList } },
        (err, res) => {
          if (err) console.log(err);
          else result.send("successfully updated");
        }
      );
  });

  /** get Password
   *
   * @param {string} id, student id
   * @returns {string} password, return hashed password to be compared
   */

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

  /** forget Password
   *
   * @param {string} id, student id
   * @returns {string} password, return hashed password to be compared
   */

  app.put("/login", (request, result) => {
    database
      .collection("students")
      .updateOne(
        { id: request.body.id },
        { $set: { password: request.body.password } },
        (err, res) => {
          if (err) result.send(err);
          else result.send("succesfully updated");
        }
      );
  });

  //general
  app.get("/", (request, result) => {
    console.log(ref_id);
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
