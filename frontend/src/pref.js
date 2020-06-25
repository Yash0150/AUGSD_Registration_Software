const listContainer = document.querySelector("#sortablelist");
const listItemTemplate = document.querySelector("template");
const saveButton = document.querySelector("#saveButton");
const logoutButton = document.querySelector("#logoutButton");

// sortable settings;
new Sortable(sortablelist, {
  animation: 150,
  ghostClass: "sortable-ghost",
});

console.log(localStorage["test"]);
// populate the list
// save the list
// logout
