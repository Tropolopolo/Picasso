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
document.getElementById("Form").addEventListener("submit",submitForm);

//Changing state between signed in and signed out
firebase.auth().onAuthStateChanged((user) => {
  //if user is logged 
  if (user) {
    var user = user.uid;
    localStorage.setItem("uid",user);
    
    //window.close();
    location.href = 'index.html';
    document.getElementById("login_div").style.display="none";
    document.getElementById("signup_id").style.display="none";
  }
  //if user is not logged in 
  else {
   document.getElementById("login_div").style.display="block";
   document.getElementById("signup_id").style.display="block";
  }
});

//login function using email and password
function login(){
  var userEmail=document.getElementById("email_id").value;
  var userPass=document.getElementById("password_id").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
 .then((userCredential) => {
   // Signed in
   var user = userCredential.user;
   // ...
 })
 .catch((error) => {
   var errorCode = error.code;
   var errorMessage = error.message;
   window.alert('Error:'+errorMessage);
 });
}

//storing values in local storage
localStorage.setItem('val',lo);


//Creating a new user
function createNewUser(){
 document.getElementById("myModal").style.display = "block";
}



//signup function 
function signup(){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  
  alert(email + password)

 firebase.auth().createUserWithEmailAndPassword(email, password)
 .then((userCredential) => {
   // Signed in 
   var user = userCredential.user;
   // ...
 })
 .catch((error) => {
   var errorCode = error.code;
   var errorMessage = error.message;
   // ..
 });}


//function to close the modal
function closefn(){
 document.getElementById("myModal").style.display = "none";
}



function submitForm(e){
  e.preventDefault();

  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;

 firebase.auth().createUserWithEmailAndPassword(email, password)
 .then((userCredential) => {
   // Signed in 
   var user = userCredential.user;
   // ...
 })
 .catch((error) => {
   var errorCode = error.code;
   var errorMessage = error.message;
   // ..
 });
}