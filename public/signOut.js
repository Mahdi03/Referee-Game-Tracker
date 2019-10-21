var signOutButton = document.querySelector("#signOutButton");
signOutButton.onclick = function() {
    try {
        localStorage.removeItem("loggedIn");
    } finally {
        window.location.replace("login.html");
    }

};