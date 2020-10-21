const axios = require("axios");
const crypto = require("crypto");

let pwdHash = crypto.createHash("sha256").update("tower").digest("hex");
/*
axios
  .get("https://ttselect.herokuapp.com")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .get("https://ttselect.herokuapp.com/prefList", {
    params: {
      id: "f20200233",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .get("http://ttselect.herokuapp.com/login", {
    params: {
      id: "f20200630",
    },
  })
  .then((pwd) => {
    if (pwd.data.password == pwdHash) console.log("Thank god this works");
    else console.log("doomed");
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .put("http://ttselect.herokuapp.com/preflist", {
    id: "f20200233",
    password: pwdHash,
    prefList: [2, 3, 5, 1, 6, 7, 4, 9, 8],
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
*/
axios
  .post("http://ttselect.herokuapp.com/students", {
    name: "Oreki",
    id: "f20200128",
    password: pwdHash,
    group: "eg",
    pr: 18,
    prefList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  })
  .then((res, err) => {
    if (err) console.log(err);
    else console.log("success");
  });
/*
axios
  .put("http://ttselect.herokuapp.com/login", {
    id: "f20200233",
    password: pwdHash,
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
*/
