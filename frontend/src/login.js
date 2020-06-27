const loginButton = document.querySelector("#loginButton");
const listContainer = document.querySelector("#sortablelist");
const listItemTemplate = document.querySelector("#listItemTemplate");
const saveButton = document.querySelector("#saveButton");
const logoutButton = document.querySelector("#logoutButton");

M.AutoInit();

function hash(algo, str) {
  return crypto.subtle.digest(algo, new TextEncoder().encode(str));
}

function hex(buff) {
  return [].map
    .call(new Uint8Array(buff), (b) => ("00" + b.toString(16)).slice(-2))
    .join("");
}

let username = "";
let pwdHash = "";

// sortable setting:w
new Sortable(sortablelist, {
  animation: 150,
  ghostClass: "sortable-ghost",
});

// the signin function

loginButton.addEventListener("click", () => {
  // disable the login button after one click
  loginButton.classList.toggle("disabled");
  username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  hash("SHA-256", password).then((hashed) => (pwdHash = hex(hashed)));
  axios
    .get("http://ttselect.herokuapp.com/login", {
      params: {
        id: username,
      },
    })
    .then((pwd) => {
      if (pwd.data.password == pwdHash) {
        M.toast({ html: "Login Successful" });
        // make the logout option and save buttons visible
        document.querySelector("#nav-mobile").style.display = "block";
        // make the pref area visible
        document.querySelector("#pref").style.display = "block";
        // make the sigin invisible
        document.querySelector("#loginArea").style.display = "none";
        // populate preference list
        axios
          .get("http://ttselect.herokuapp.com/prefList", {
            params: {
              id: username,
            },
          })
          .then((res) => {
            // populate the item list
            let group = res.data["group"];
            let prefList = res.data["prefList"];

            prefList.forEach((it) => console.log(it));

            prefList.forEach((element) => {
              let newListItem = listItemTemplate.cloneNode(true);
              newListItem.style.display = "block";
              newListItem.querySelector(".ttname").innerText =
                group + " " + element;
              listContainer.appendChild(newListItem);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        M.toast({ html: "Login failed, please try again" });
        loginButton.classList.toggle("disabled");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// savebutton function

saveButton.addEventListener("click", () => {
  let finalPrefList = [];
  Array.from(listContainer.childNodes).forEach((element) => {
    if (
      element.innerText &&
      element.innerText.length &&
      element.innerText.length < 5 // to remove the template element
    ) {
      finalPrefList.push(element.innerText.split(" ")[1]);
    }
  });

  axios
    .put("http://ttselect.herokuapp.com/preflist", {
      id: username,
      pwd: pwdHash,
      prefList: finalPrefList,
    })
    .then((res) => {
      M.toast({ html: "successfully saved" });
      setTimeout(() => location.reload(), 2000);
    })
    .catch((err) => {
      M.toast({ html: "some error occured, please try again" });
      console.log(err);
    });
});

// logout button function
logoutButton.addEventListener("click", () => {
  location.reload();
});
