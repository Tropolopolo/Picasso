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
//referencing a database named "Picasso"
//if it does not exists, it is created
let database = firebase.database();
let child = localStorage.getItem("uid");

//listening to when the submit button is pressed in the form
document.getElementById("Form").addEventListener("submit",submitForm);
document.getElementById("Form2").addEventListener("submit",submitStore);

database.ref("Picasso").child(child).on("value",getData,errData);
localStorage.setItem('x', 0);

<<<<<<< HEAD
database.ref("Picasso").child(child).on("value",getData,errData);
=======
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095

//*************************************************Get Data Function*************************************************************//
//getData: retrieves the values stored in firebase, sorts these values if necessary, and then displayes them on the website.
//input: firebase database values.
//output: new html ui elements that display each product entry.
function getData(){
  let b = document.querySelectorAll(".Box1");

  for(var j=0; j<b.length; j++ ){
    b[j].remove();
  }

<<<<<<< HEAD
  let ItemCategory;
  let ItemName;
  let ItemPrice;
  let ItemNumber;
  let AileNumber;
  //console.log(data.val());
  let objectData = data.val();
  let keys = Object.keys(objectData);
  //console.log(keys);
=======
  //Adding a store value
  /*
    Adding a store value allows for data to be contained in each store.
    Adding this will make the children of the User into each store the User owns.
    Therefore to get each item we must first choose a store who's data will be displayed.
    This can be a data value associated with the User that we can allow the user to change.
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095

    What needs to be done:
    Need to define a variable to hold the store keys.
    Need to iterate over these keys to get the item data.
      *Or maybe just lookup the current store that will be displayed.
    Need a variable to define which store to show initially.
    Need to change how we send data to the database to store new values.
  */

<<<<<<< HEAD
    let k = keys[i];
    ItemCategory  =objectData[k].ItemCategory;
    ItemName      =objectData[k].ItemName;
    ItemPrice     =objectData[k].ItemPrice;
    ItemNumber    =objectData[k].ItemNumber;
    AileNumber    =objectData[k].AileNumber;
=======
  //values needed to determine the store that we will retrieve product data from.
  var DefaultStore;
  var StoreContainer;
  var datavalues;
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095

  //Routine that retrieves all the store keys along with the default store value.
  database.ref("Picasso").child(child).on('value', (snapshot) => {
    StoreContainer = database.ref("Picasso").child(child); //Keys of each store
    DefaultStore = snapshot.child("DefaultStore").val();
    datavalues = snapshot.val();
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });

  //values that represent the data stored about the products.
  let ItemCategory;
  let ItemName;
  let ItemPrice;
  let ItemNumber;
  let AileNumber;
  
  //used to keep legacy code working.
  let objectData = datavalues;
  let Stores = Object.keys(objectData); //obtained list of store keys.

  Stores.forEach(lstoreStore); //Add the value obtained from the key to local storage.

  //store a couple data points the help describe the store we are currently on into local storage.
  localStorage.setItem("StoreAmount",Stores.length-1);
  localStorage.setItem("DefaultStore",DefaultStore);
  //localStorage.setItem("StoreName", StoreContainer.child(Stores[DefaultStore]).child("StoreName"));

  //Gets the store reference we want to display.
  let StoreRef = StoreContainer.child(Stores[DefaultStore]);

  //container for the items we will display later.
  let items = [];

  //stores the name and number of the store into local storage,
  //Retrieves the product data from the store,
  //Applies any filter on the data that should be shown.
  //Adds the filtered data to the items container.
  StoreRef.on('value', (snapshot) => {
    localStorage.setItem("StoreName", snapshot.child("StoreName").val());
    localStorage.setItem("StoreNum", snapshot.child("StoreNum").val());

    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      if(typeof childData == 'object')
      {
        ItemCategory  = childData.ItemCategory;
        ItemName      = childData.ItemName;
        ItemPrice     = childData.ItemPrice;
        ItemNumber    = childData.ItemNumber;
        AileNumber    = childData.AileNumber;

        let filter = localStorage.getItem("filter");
        if(filter!=null && filter!=""){

          if(ItemCategory == filter);
          else if(ItemName == filter);
          else if(ItemNumber == filter);
          else if(ItemPrice == filter);
          else if(AileNumber == filter);
          else
            return;
        }

        let rdata = [
          ItemCategory,
          ItemName,
          ItemPrice,
          ItemNumber,
          AileNumber
        ];
        
        items.push(rdata);
      }
     });

  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });

  //Gets the store title and sets it to local variable StoreName, unless StoreName is null, then it is blank.
  let storeTitle = document.getElementById("StoreTitle");
  let str = localStorage.getItem("StoreName");
  if(str == null || str == "null"){
    storeTitle.innerHTML = "Store: "; 
  }else{
    storeTitle.innerHTML = "Store: " + str;
  }

  //Gets the Type and Order Selections html elements
  var type = document.getElementById("Type-Selection");
  var order = document.getElementById("Order-Selection");

  //Switch statement that will apply specific sorting functions based on the user's sorting input.
  switch(true){
    case(type.value == "Price" && order.value =="Ascending"):{
      items.sort(compareValueA);
      break;
    }
    case(type.value == "Price" && order.value =="Descending"):{
      items.sort(compareValueD);
      break;
    }
    case(type.value == "Quantity" && order.value =="Ascending"):{
      items.sort(compareQuantityA);
      break;
    }
    case(type.value == "Quantity" && order.value =="Descending"):{
      items.sort(compareQuantityD);
      break;
    }
    case(type.value == "Aile" && order.value =="Ascending"):{
      items.sort(compareAileA);
      break;
    }
    case(type.value == "Aile" && order.value =="Descending"):{
      items.sort(compareAileD);
      break;
    }
  }

  //Container that hold html elements
  let divs = [];

  //For loop that loops through the items array and constructs a list of html elements that are added to divs
  for(var i = 0; i<items.length; i++){
    //Creating a list to put the data in
    let li = document.createElement("ul");
    li.className="list";
    li.id="list";
    li.innerHTML='<table class="projectTable">' +
<<<<<<< HEAD
                '<tr>'+'<th>'+"Item Category: "+'</th>'+'<th>'+ ItemCategory +'</th>'+'</tr>'+
                '<tr>'+'<th>'+"Item Name: " +'</th>'+'<th>'+ItemName+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Item Price: "+ '</th>'+'<th>' +'$'+ItemPrice+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Item Number: "+ '</th>'+'<th>' + ItemNumber+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Aile Number: "+ '</th>'+'<th>' + AileNumber+'</th>' + '</tr>'+
                '</table>';

  //Creating a box
  //All this is just to put the data in a box in html, style is in css as Box1 and P1
  //toAdd is a document fragment to put the box in
  //var toAddBox = document.createDocumentFragment();
  //creating a div so that we can give the box an id and class
  let newDiv = document.createElement('div');
  newDiv.id = "Box";
  newDiv.className = 'Box1';

  let colorDiv = document.createElement('div');
  colorDiv.className = 'colorDiv';

  

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
  Para.className="P1";
  //appending to html
  // let seeMore = document.createElement("button");
  // seeMore.className="seeMore";
  // seeMore.innerHTML="see more";
  // seeMore.onclick=function(){
  //   location.href = 'info.html'
  //   localStorage.setItem("value",k);
  //   console.log(k);
  // };
  
  
  Para.appendChild(li);
  newDiv.appendChild(Para);
  newDiv.appendChild(cl);

  //newDiv.appendChild(seeMore);
  // newDiv.appendChild(dropDownDiv);
  //toAddBox.appendChild(newDiv);
  let show = document.getElementById("search_btn");
  
  show.addEventListener("click",function(){

    let x= document.getElementById("search_inp").value;
    localStorage.setItem("x",x);

  });
  let b=localStorage.getItem("x");

  console.log(b);

  if(b==="")
  {
    document.getElementById('body').appendChild(newDiv);
    continue;
  }

  if(ItemCategory===b){
    document.getElementById('body').appendChild(newDiv);
  }
  if(ItemName===b){
    document.getElementById('body').appendChild(newDiv);
  }
  if(AileNumber===b){
    document.getElementById('body').appendChild(newDiv);
  }


=======
                '<tr id="ic">'+'<th>'+"Item Category: "+'</th>'+'<th>'+ items[i][0] +'</th>'+'</tr>'+
                '<tr>'+'<th>'+"Item Name: " +'</th>'+'<th>'+items[i][1]+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Item Price: "+ '</th>'+'<th>' +'$'+items[i][2]+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Item Quantity: "+ '</th>'+'<th>' + items[i][3]+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Aisle Number: "+ '</th>'+'<th>' + items[i][4]+'</th>' + '</tr>'+
                '</table>';
    let newDiv = document.createElement('div');
    newDiv.id = "Box";
    newDiv.className = 'Box1';
 
    let colorDiv = document.createElement('div');
    colorDiv.className = 'colorDiv';
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
 
    divs.push(newDiv);
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
  }

  //Display the new html elements.
  displayer(divs);
}

//***------------------------------------------Sort Functions-------------------------------------------***
//Sorting functions: used with the .sort() method to sort the data by specific values.
//input: a, unspecific first argument from the list. b, unspecific second arguement from the list.
//output: sorts the list of products that is then used to create the html elements.
function compareValueA(a,b)
{
  if(a[2] === b[2]){
    return 0;
  }
  else {
    return (parseFloat(a[2]) < parseFloat(b[2]))?-1:1;
  }
}

function compareValueD(a,b)
{
  if(a[2] === b[2]){
    return 0;
  }
  else {
    return (parseFloat(a[2]) > parseFloat(b[2]))?-1:1;
  }
}

function compareQuantityA(a,b)
{
  if(a[3] === b[3]){
    return 0;
  }
  else {
    return (parseFloat(a[3]) < parseFloat(b[3]))?-1:1;
  }
}

function compareQuantityD(a,b)
{
  if(a[3] === b[3]){
    return 0;
  }
  else {
    return (parseFloat(a[3]) > parseFloat(b[3]))?-1:1;
  }
}

function compareAileA(a,b)
{
  if(a[4] === b[4]){
    return 0;
  }
  else {
    return (parseFloat(a[4]) < parseFloat(b[4]))?-1:1;
  }
}

function compareAileD(a,b)
{
  if(a[4] === b[4]){
    return 0;
  }
  else {
    return (parseFloat(a[4]) > parseFloat(b[4]))?-1:1;
  }
}
//***------------------------------------------Sort Functions-------------------------------------------***

//displayer: takes a list of html elements and displayes them on the website
//input: container containing all the html elements
//output: data displayed on the website.
function displayer(container)
{
  for(let i = 0; i < container.length; i++)
  {
    document.getElementById('body').appendChild(container[i]);
  }
}

//errData: prints error message when data retrieval fails.
//input: err, the error message
//output: an alert message and console log with the err message displayed.
function errData(err){
  console.log("Error");
  console.log(err);
}

//lstoreStore: Used to store the names of the stores into local storage systematically
//input: The store being saved via 'item' and the index in the list via 'index'
//output: local storage will be updated with the list of stores.
function lstoreStore(item, index)
{
  if(item == "DefaultStore" || item=="undefined")
    return;
  localStorage.setItem("Store" + index, item);
}

//***********************************************Function to submit form*********************************************************//
//submitForm: Adds new product data to the database
//input: e, the product data
//output: inserts new product data into the database
function submitForm(e){
  e.preventDefault();

  let check = localStorage.getItem("StoreAmount");
  if(check == 0 || check == null){
    window.alert("Create a Store first!");
    return;
  }

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
<<<<<<< HEAD
  let formDB = database.ref("Picasso/"+child);
  //pushing the data to the databases
  formDB.push(data);
=======

  //console.log(Stores[DefaultStore]);
  let formDB = database.ref("Picasso/" + child);
  //pushing the data to the databases 
  formDB.child(Stores[DefaultStore]).push(data);
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095

  //showing an alert at the top to conform that the data has been sent
  showAlert();

  //resetting the form
  document.getElementById("Form").reset();
  window.location.reload();
  
}

//submitStore: Sends the store data to the database
//input: data from local storage.
//output: inserts new data into the database.
function submitStore(s){

  let StoreAmount = localStorage.getItem("StoreAmount");
  let Stores = [];
  for(var i=0; i<StoreAmount-1; i++)
  {
    Stores.push(localStorage.getItem("Store" + i));
  }

  let data = {
    StoreNum:parseInt(localStorage.getItem("StoreAmount")) + 1,
    StoreName:getElementVal("StoreName"),
  };

  let formDB = database.ref("Picasso/" + child);
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
};


//function to logout the user
function out(){
  firebase.auth().signOut().then(() => {
    location.href = 'login.html';

  }).catch((error) => {
    window.alert(error);

  });
}


<<<<<<< HEAD
=======
var currentTab = 0; // Current tab is set to be the first tab (0)

//Anmol Input
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

//Anmol Input
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

//Anmol's input
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

//Anmol's input.
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//out: logs the user out of the website
//input: none
//output: user is signed out. Clears local variables upon leaving.
function out(){
  localStorage.clear();
  firebase.auth().signOut().then(() => {
    location.href = 'login.html'

  }).catch((error) => {

  });
}

//nextStore: Changes the currently showing store to store number 'n'
//input: n, the store number to change to
//output: updates the main page with new data for the change in store.
function nextStore(n){
  let formDB = database.ref("Picasso/" + child);
  formDB.update({'DefaultStore': n});
  localStorage.setItem("filter", "");
  getData();
}

//search: sets the localstorage item "filter" to whatever the value of "search_inp" is.
//input: none
//output: "filter" local variable is set to "search_inp" value.
function search(){
  let searchCriteria = document.getElementById("search_inp");
  localStorage.setItem("filter", searchCriteria.value);
}

//delStore: Deletes a store from the database, including all inventory items.
//Input: Takes a string with the child name that will be removed
//Output None
function delStore(s){
  database.ref("Picasso").child(child).child(s).remove().then(function(){
    window.reload();
  });
}
>>>>>>> 69eaca25ba48cf6ad733a89e75514312160f6095
