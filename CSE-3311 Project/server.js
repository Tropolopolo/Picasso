//Youtube video used = https://www.youtube.com/watch?v=RAWHXRTKTHw

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
const formDB = firebase.database().ref("Picasso");
formDB.on("value",getData,errData);

//listening to when the submit button is pressed
document.getElementById("Form").addEventListener("submit",submitForm);


//To get data
function getData(data){
  var ProjectName;
  var Address;
  var ProjectManager;
  var MatsUsed;
  //console.log(data.val());
  var objectData = data.val();
  var keys = Object.keys(objectData);
  var i;
  
  //console.log(keys);
  for(i = 0; i < keys.length; i++)
  {

    var k = keys[i];
    ProjectName = objectData[k].ProjectName;
    Address = objectData[k].Address;
    ProjectManager = objectData[k].ProjectManager;
    MatsUsed = objectData[k].MatsUsed;

    //Creating a list to put the data in
    var li = document.createElement("ul");
    li.id="list";
    li.innerHTML="Project Name: " + ProjectName + "</br></br>" +
                  "Address: " + Address + "</br></br>" +
                  "Project Manager: " + ProjectManager + "</br></br>" +
                  " Materials Used: " + MatsUsed + "</br></br>";

    //All this is just to put the data in a box in html, style is in css
    var toAdd = document.createDocumentFragment();
    var newDiv = document.createElement('div');
    newDiv.id = "Box";
    newDiv.className = 'Box1';
    var Para = document.createElement('div');
    Para.className="P1"
    Para.appendChild(li);
    newDiv.appendChild(Para);
    toAdd.appendChild(newDiv);
    document.getElementById('body').appendChild(toAdd);

  }
  
}


//To get data
function errData(err){
  console.log("Error");
  console.log(err);

}


//function to execute when the submit button is pressed
// e is for event
function submitForm(e){
  e.preventDefault();
  //getting all the data from the form
  var data = {
    ProjectName:getElementVal("ProjectName"),
    Address:getElementVal("Address"),
    ProjectManager:getElementVal("ProjectManager"),
    MatsUsed:getElementVal("MatsUsed")
  }

  //pushing the data to the databases
  formDB.push(data);

  //showing an alert at the top to conform that the data has been sent
  showAlert();

  //resetting the form
  document.getElementById("Form").reset();
  window.location.reload();
  
}


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
