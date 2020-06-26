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

// populate the list
// const bitsid = localStorage["bitsId"];
let bitsId = "f20200233";
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
      newListItem.querySelector(".ttname").innerText = group + " " + element;
      listContainer.appendChild(newListItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// save the list

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

// logout
logoutButton.addEventListener("click", () => {
  // implement google signout
  // redirect to index.html
});
