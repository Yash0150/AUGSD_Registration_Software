let details = {};

document
  .querySelector(".g-signin2")
  .addEventListener("data-onsuccess", (googleUser) => {
    const profile = googleUser.getBasicProfile();
    details["ID"] = profile.getId();
    details["name"] = profile.getName();
    details["email"] = profile.getEmail();
    // get the f20.. id
    localStorage["bitsId"] = details["email"].split("@")[0];
  });
