const listContainer = document.querySelector("#sortablelist");
const listItemTemplate = document.querySelector("#listItemTemplate");
const saveButton = document.querySelector("#saveButton");
const logoutButton = document.querySelector("#logoutButton");
M.AutoInit();

// sortable setting:w
new Sortable(sortablelist, {
  animation: 150,
  ghostClass: "sortable-ghost",
});

let details = {};

// the signin function
document
  .querySelector(".g-signin2")
  .addEventListener("data-onsuccess", (googleUser) => {
    const profile = googleUser.getBasicProfile();
    details["ID"] = profile.getId();
    details["name"] = profile.getName();
    details["email"] = profile.getEmail();
    // get the f20.. id
    localStorage["bitsId"] = details["email"].split("@")[0];
    // id for authentication
    localStorage["idToken"] = googleUser.getAuthResponse().id_token;
    console.log(details);

    // make the logout option and save buttons visible
    document.querySelector("#nav-mobile").style.display = "block";
    // make the pref area visible
    document.querySelector("#pref").style.display = "block";
    // make the sigin invisible
    document.querySelector("#login").style.display = "none";
    // populate preference list
    axios
      .get("https://ttselect.herokuapp.com/prefList", {
        params: {
          id: bitsId,
        },
      })
      .then((res) => {
        // populate the item list
        let group = res.data["group"];
        let prefList = res.data["prefList"];

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
      id: bitsId,
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
  // implement google signout
  // redirect to index.html
});
