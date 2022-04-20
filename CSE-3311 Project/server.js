//*************************************************Firebase configuration********************************************************//
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
// let id = localStorage.getItem("uid");
//referencing a database named "Picasso"
//if it does not exists, it is created
let database = firebase.database();
let child = localStorage.getItem("uid");

//listening to when the submit button is pressed in the form
document.getElementById("Form").addEventListener("submit",submitForm);
document.getElementById("Form2").addEventListener("submit",submitStore);

database.ref("Picasso").child(child).on("value",getData,errData);
localStorage.setItem('x', 0);


//*************************************************Get Data Function*************************************************************//
//To get data
function getData(data){
  //data.preventDefault();
  //let l = document.querySelectorAll(".list");
  let b = document.querySelectorAll(".Box1");

  for(var j=0; j<b.length; j++ ){
    //l[i].remove();
    b[j].remove();
  }

  //Adding a store value
  /*
    Adding a store value allows for data to be contained in each store.
    Adding this will make the children of the User into each store the User owns.
    Therefore to get each item we must first choose a store who's data will be displayed.
    This can be a data value associated with the User that we can allow the user to change.

    What needs to be done:
    Need to define a variable to hold the store keys.
    Need to iterate over these keys to get the item data.
      *Or maybe just lookup the current store that will be displayed.
    Need a variable to define which store to show initially.
    Need to change how we send data to the database to store new values.
  */

var DefaultStore;
var StoreContainer;
var datavalues;

database.ref("Picasso").child(child).on('value', (snapshot) => {
  StoreContainer = database.ref("Picasso").child(child); //Keys of each store
  DefaultStore = snapshot.child("DefaultStore").val();
  datavalues = snapshot.val();
  //console.log(StoreContainer);
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

  let ItemCategory;
  let ItemName;
  let ItemPrice;
  let ItemNumber;
  let AileNumber;
  
  let objectData = datavalues;
  let Stores = Object.keys(objectData);

  Stores.forEach(lstoreStore);

  localStorage.setItem("StoreAmount",Stores.length-1);
  localStorage.setItem("DefaultStore",DefaultStore);
  //console.log("Stores " + Stores);

  let StoreRef = StoreContainer.child(Stores[DefaultStore]);

  StoreRef.on('value', (snapshot) => {
    localStorage.setItem("StoreName", snapshot.child("StoreName").val());
    localStorage.setItem("StoreNum", snapshot.child("StoreNum").val());

    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      //console.log(childData);
      if(typeof childData == 'object')
      {
        ItemCategory  = childData.ItemCategory;
        ItemName      = childData.ItemName;
        ItemPrice     = childData.ItemPrice;
        ItemNumber    = childData.ItemNumber;
        AileNumber    = childData.AileNumber;

        //console.log("ItemCategory: " + ItemCategory);

         //Creating a list to put the data in
        let li = document.createElement("ul");
        li.className="list";
        li.id="list";
        li.innerHTML='<table class="projectTable">' +
                    '<tr>'+'<th>'+"Item Category: "+'</th>'+'<th>'+ ItemCategory +'</th>'+'</tr>'+
                    '<tr>'+'<th>'+"Item Name: " +'</th>'+'<th>'+ItemName+'</th>' + '</tr>'+
                    '<tr>'+'<th>'+"Item Price: "+ '</th>'+'<th>' +'$'+ItemPrice+'</th>' + '</tr>'+
                    '<tr>'+'<th>'+"Item Number: "+ '</th>'+'<th>' + ItemNumber+'</th>' + '</tr>'+
                    '<tr>'+'<th>'+"Aile Number: "+ '</th>'+'<th>' + AileNumber+'</th>' + '</tr>'+
                    '</table>';
        let newDiv = document.createElement('div');
        newDiv.id = "Box";
        newDiv.className = 'Box1';

        let colorDiv = document.createElement('div');
        colorDiv.className = 'colorDiv';

        //This May have to change. Code: 1101
        let cl = document.createElement("button");
        cl.className="close1";
        cl.textContent="Delete Item";
        cl.addEventListener("click", function(){
          if (confirm("Are you sure you want to delete the project")) {
            database.ref('Picasso').child(child).child(k).remove();
          }
        });

        //creating a div to put the retrived data in
        let Para = document.createElement('div');
        Para.className="P1"
        
        Para.appendChild(li);
        newDiv.appendChild(Para);
        newDiv.appendChild(cl);

        document.getElementById('body').appendChild(newDiv);
      }
        //console.log(childData);
     });

    //console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}
//To get data
function errData(err){
  console.log("Error");
  console.log(err);
}

function lstoreStore(item, index)
{
  if(item == "DefaultStore" || item=="undefined")
    return;
  localStorage.setItem("Store" + index, item);
}

//***********************************************Function to submit form*********************************************************//
//function to execute when the submit button is pressed
// e is for event
function submitForm(e){
  e.preventDefault();

  //console.log(e);
  //We need to save the current store they are looking at
  //we need to update only the store they want to add a product to.

  let StoreAmount = localStorage.getItem("StoreAmount");
  let Stores = [];
  for(var i=0; i<StoreAmount; i++)
  {
    Stores.push(localStorage.getItem("Store" + i));
  }

  let DefaultStore = localStorage.getItem("DefaultStore");
  
  //getting all the data from the form
  let data = {
    ItemCategory:getElementVal("ItemCategory"),
    ItemName:getElementVal("ItemName"),
    ItemPrice:getElementVal("ItemPrice"),
    ItemNumber:getElementVal("ItemNumber"),
    AileNumber:getElementVal("AileNumber")
  };

  //console.log(Stores[DefaultStore]);
  let formDB = database.ref("Picasso/" + child);
  //pushing the data to the databases 
  formDB.child(Stores[DefaultStore]).push(data);

  //showing an alert at the top to conform that the data has been sent
  showAlert();

  //resetting the form
  document.getElementById("Form").reset();
  window.location.reload();
  
}

//Add new submittion function for a new store
function submitStore(s){

  let StoreAmount = localStorage.getItem("StoreAmount");
  let Stores = [];
  for(var i=0; i<StoreAmount-1; i++)
  {
    Stores.push(localStorage.getItem("Store" + i));
  }

  //console.log(Stores);

  //let DefaultStore = localStorage.getItem("DefaultStore");

  let data = {
    StoreNum:getElementVal("StoreNum"),
    StoreName:getElementVal("StoreName"),
  };

  //console.log(data);
  let formDB = database.ref("Picasso/" + child);
  //formDB.update({'DefaultStore': 0});
  //pushing the data to the databases 
  formDB.push(data);

  //showing an alert at the top to conform that the data has been sent
  showAlert();

  //resetting the form
  document.getElementById("Form").reset();
  window.location.reload();
}

//*******************************************Function to show sent alert*********************************************************//
//function to show the alert
function showAlert(){
  document.querySelector(".alert").style.display="block";
  setTimeout(() => {document.querySelector(".alert").style.display="none";}, 2000);
}


//function to get an element value
//it is used in the "data" object above
const getElementVal = (id)=>{
  return document.getElementById(id).value;
}


var currentTab = 0; // Current tab is set to be the first tab (0)
//showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


function out(){
  localStorage.clear();
  firebase.auth().signOut().then(() => {
    location.href = 'login.html'

  }).catch((error) => {

  });
  //window.alert("sdfsdfgefgsfsg");
  //location.href = 'login.html'
}

function nextStore(n){
  let formDB = database.ref("Picasso/" + child);
  formDB.update({'DefaultStore': n});
}
