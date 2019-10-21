var user = JSON.parse(localStorage.getItem("loggedIn"));
var username, email, fullName, gamesReffed;
if (user === null && window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html" && window.location.pathname !== "/index.html") {
    window.location.replace("login.html");
} else {
    if (user !== null && window.location.pathname == "/login.html" || window.location.pathname == "/register.html" || window.location.pathname == "/index.html") {
        window.location.replace("home.html");
    }
    //Define Global Variables
    username = user.username;
    email = user.email;
    fullName = user.fullName;
    gamesReffed = user.gamesReffed;
    updateUser();
}

function updateUser() {
    var db = firebase.firestore();
    db.collection("users").doc(username).get().then(function(doc) {
        if (doc.exists) {
            localStorage.setItem("loggedIn", JSON.stringify(doc.data()));
            user = JSON.parse(localStorage.getItem("loggedIn"));
        }
    });
}
//maybe add more functionality to this later