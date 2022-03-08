
const firebaseConfig = {
    apiKey: "AIzaSyBganeN22quF9d0vAqJeAgYr9BCQyioKeg",
    authDomain: "picasso-2f8a6.firebaseapp.com",
    databaseURL: "https://picasso-2f8a6-default-rtdb.firebaseio.com",
    projectId: "picasso-2f8a6",
    storageBucket: "picasso-2f8a6.appspot.com",
    messagingSenderId: "658469420641",
    appId: "1:658469420641:web:951806d6a4eae684827420",
    measurementId: "G-HWY7NTX42Q"
  };
  //reference your database
  firebase.initializeApp(firebaseConfig);
  
  //referencing a database named "Picasso"
  //if it does not exists, it is created
  let database = firebase.database();
function createUser(){
    //first I get the values from the input
    let u = document.getElementById("username").value;
    let e = document.getElementById("email").value;
    let p = document.getElementById("pass").value;

    //some Regex functionality...

    //Check if the password entry is null, was mainly used for testing
    if(p == null){
        alert("The Password is Null");
    }

    //Get the database reference
    let db = database.ref("Picasso/");
    //var key = db.push().key();
    const rand = Math.random().toString(16).substr(2,8);
    //Data we want to push
    var newUser = {
        email: e,
        pass: p,
        id: rand
    }

    db.child('Users').child(u).set(newUser);
    //upon success load into the next webpage with the user data.
}

function login(){
    retrieveUser();
    //changePage("http://127.0.0.1:5500/CSE-3311%20Project/index.html");
}

function retrieveUser(){
    let u = document.getElementById("username").value;
    //let e = $('#email').val();
    //let p = $('#Pass').val();

    //We will not use 'p' for now since I don't want to implement passwords yet.

    let db = database.ref("Picasso/");

    /*
    let result = db.child('Users').once('value').then(function(dataSnapshot) {
        //handle read data
        console.log(dataSnapshot.val());
    });
    */

    db.child('Users').child(u).once("value", function(snapshot){
            var email = snapshot.child("email").val();
            var id = snapshot.child("id").val();
            console.log("Email: " + email + " id: " + id);
            document.cookie = "email=" + email.toString() + ";";
            document.cookie = "id=" + id.toString() + ";";
    });
    console.log(location.href);
    //setTimeout(function(){document.location.href = "/CSE-3311 Project/index.html;"},500);
    //changePage("/CSE-3311 Project/index.html");
    return;
}

function changePage(page)
{
    document.location.href = page;
}

function log(){
    console.log($('#email').val());
    console.log($('#pass').val());
}