const listContainer = document.querySelector("#sortablelist");
const listItemTemplate = document.querySelector("#listItemTemplate");
const orderTemplate = document.querySelector("#otemp");
const saveButton = document.querySelector("#saveButton");
const logoutButton = document.querySelector("#logoutButton");

const auth = firebase.auth();
const db = firebase.firestore();

console.log('hello');
var ui = new firebaseui.auth.AuthUI(firebase.auth());

let email = "";
let id = "";
let group = "";

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // to make changes for email users
      email = authResult.additionalUserInfo.profile.email;
      id = email.split('@')[0];
      console.log(id);
      let prefList = [];

      db.collection('preferences').doc(id).get().then(doc => {
        if(doc.exists){
          group = doc.data().group;
          prefList = doc.data().pref;
          console.log(group, prefList);
        }
        else{
          group = "WS";
          prefList = [1, 2, 3, 4, 5];
          console.log("No Document Found");
        }

        document.querySelector("#nav-mobile").style.display = "block";
        document.querySelector("#pref").style.display = "block";
        let prefCount = 1;

        prefList.forEach((element) => {
          let newListItem = listItemTemplate.cloneNode(true);
          newListItem.style.display = "block";
          newListItem.querySelector(".ttname").innerText =
            group + " " + element;
          let orderMark = orderTemplate.cloneNode(true);
          orderMark.style.display = "block";
          orderMark.querySelector("#oMark").innerText = prefCount;
          prefCount++;
          document.querySelector("#orderMarker").appendChild(orderMark);
          listContainer.appendChild(newListItem);
        });
      })


      return false;
    },
  },
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

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

  db.collection('preferences').doc(id).set({
    group : group,
    pref: finalPrefList
  }).then(() => {
    console.log("Saved Successfully");
    location.reload();
  });
});

// logout button function
logoutButton.addEventListener("click", () => {
  auth.signOut().then(() => {
    console.log('logged out');
    location.reload();
  });
});

ui.start('#firebaseui-auth-container', uiConfig);


// sortable setting:w
new Sortable(sortablelist, {
  animation: 150,
  ghostClass: "sortable-ghost",
});
