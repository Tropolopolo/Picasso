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

 firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     var user = user.uid;
     localStorage.setItem("uid",user);
     
     //window.close();
     location.href = 'index.html'
     document.getElementById("login_div").style.display="none";
     document.getElementById("user_div").style.display="none";
     document.getElementById("signup_id").style.display="none";
   } else {
    document.getElementById("user_div").style.display="none";
    document.getElementById("login_div").style.display="block";
    document.getElementById("signup_id").style.display="block";
    document.getElementById("signup_div").style.display="none";
   }
 });
function login(){
   let userEmail=document.getElementById("email_id").value;
   let userPass=document.getElementById("password_id").value;

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

function logout(){
  firebase.auth().signOut().then(() => {
    //location.href = 'login.html'

  }).catch((error) => {

  });
  //window.alert("sdfsdfgefgsfsg");
  //location.href = 'login.html'
}

localStorage.setItem('val',lo);

function createNewUser(){
  document.getElementById("signup_div").style.display="block";
  document.getElementById("signup_id").style.display="none";
  document.getElementById("login_div").style.display="none";

}

function signup(){
  let signupEmail=document.getElementById("email").value;
  let signupPass=document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPass)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Error:'+errorMessage);
    // ..
  });

}



// When the user clicks the button, open the modal 
function createNewUser() {
  document.getElementById("myModal").style.display = "block";
}

function closefn(){
  document.getElementById("myModal").style.display = "none";
}

const user = firebase.auth().currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.

  const email = user.email;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getIdToken() instead.
  const uid = user.uid;
  window.alert("email is"+email);
}
