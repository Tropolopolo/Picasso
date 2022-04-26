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

<<<<<<< HEAD
=======
 //When user is authorized change webpage to homepage
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
 firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     var user = user.uid;
     localStorage.setItem("uid",user);
     
<<<<<<< HEAD
     //window.close();
     location.href = 'index.html'
=======
     location.href = 'index.html';
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
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
<<<<<<< HEAD
=======

//login: logs the user in if credentials are correct
//input: html element values
//output: change to home page and load in user data.
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
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

<<<<<<< HEAD
function logout(){
  firebase.auth().signOut().then(() => {
    //location.href = 'login.html'
=======
//unused legacy code.
function logout(){
  localStorage.clear();
  firebase.auth().signOut().then(() => {
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095

  }).catch((error) => {

  });
<<<<<<< HEAD
  //window.alert("sdfsdfgefgsfsg");
  //location.href = 'login.html'
}

localStorage.setItem('val',lo);

=======
}

//createNewUser: Adjusts the styles of some html elements
//input: html elements
//output: displays and undisplays html elements
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
function createNewUser(){
  document.getElementById("signup_div").style.display="block";
  document.getElementById("signup_id").style.display="none";
  document.getElementById("login_div").style.display="none";

}

<<<<<<< HEAD
=======
//signup: update firebase authentication with new user
//input: html element values
//output: new user added to database.
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
function signup(){
  let signupEmail=document.getElementById("email").value;
  let signupPass=document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPass)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    window.alert("user");
<<<<<<< HEAD

=======
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Error:'+errorMessage);
    // ..
  });
<<<<<<< HEAD

=======
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
}



// When the user clicks the button, open the modal 
function createNewUser() {
  document.getElementById("myModal").style.display = "block";
}

<<<<<<< HEAD
=======
//removes modal
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
function closefn(){
  document.getElementById("myModal").style.display = "none";
}

<<<<<<< HEAD
=======
//Anmol's Input
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
const user = firebase.auth().currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.

  const email = user.email;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getIdToken() instead.
  const uid = user.uid;
<<<<<<< HEAD
  window.alert("email is"+email);
=======
  window.alert("email is "+email);
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
}
