//Youtube video used = https://www.youtube.com/watch?v=RAWHXRTKTHw
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


//listening to when the submit button is pressed in the form
document.getElementById("Form").addEventListener("submit",submitForm);

database.ref("Picasso").on("value",getData,errData);

//*************************************************Get Data Function*************************************************************//
//To get data
function getData(data){
  //data.preventDefault();
  //let l = document.querySelectorAll(".list");
  let b = document.querySelectorAll(".Box1");
  let dropList = document.querySelectorAll(".dropDown");

  for(var j=0; j<b.length; j++ ){
    //l[i].remove();
    b[j].remove();
    //window.location.reload();
    dropList[j].remove();
  }

  let ProjectName;
  let Address;
  let ProjectManager;
  let MatsUsed;
  //console.log(data.val());
  let objectData = data.val();
  let keys = Object.keys(objectData);
  //console.log(keys);

  for(var i = 0; i < keys.length; i++)
  {

    let k = keys[i];
    ProjectName = objectData[k].ProjectName;
    Address = objectData[k].Address;
    ProjectManager = objectData[k].ProjectManager;
    MatsUsed = objectData[k].MatsUsed;

    //Creating a list to put the data in
    let li = document.createElement("ul");
    li.className="list";
    li.id="list";
    li.innerHTML='<table class="projectTable">' +
                 '<tr>'+'<th>'+"Project Name: "+'</th>'+'<th>'+ ProjectName +'</th>'+'</tr>'+
                 '<tr>'+'<th>'+"Address: " +'</th>'+'<th>'+Address+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"Project Manager: " + '</th>'+'<th>'+ProjectManager +'</th>'+ '</tr>'+
                 '<tr>'+'<th>'+" Materials Used: "+ '</th>'+'<th>' + MatsUsed+'</th>' + '</tr>'+
                 '</table>';

  //Creating a box
  //All this is just to put the data in a box in html, style is in css as Box1 and P1
  //toAdd is a document fragment to put the box in
  //var toAddBox = document.createDocumentFragment();
  //creating a div so that we can give the box an id and class
  let newDiv = document.createElement('div');
  newDiv.id = "Box";
  newDiv.className = 'Box1'; 

  let cl = document.createElement("button");
  cl.className="close";
  cl.textContent="X";
  cl.addEventListener("click", function(){
    database.ref('Picasso/' + k).remove();
    
    //window.location.reload();
  });
  
  //creating a div to put the retrived data in
  let Para = document.createElement('div');
  Para.className="P1"
  //appending to html
  Para.appendChild(li);
  newDiv.appendChild(Para);
  newDiv.appendChild(cl);
  //toAddBox.appendChild(newDiv);
  document.getElementById('body').appendChild(newDiv);


  //Drop down menu to see all the current Projects
  let dropDown = document.createElement("a");
  dropDown.className="dropDown";
  var value = document.createTextNode(ProjectName);
  dropDown.href="#";
  dropDown.append(value);
  const element = document.getElementById("dropdown-content");
  element.appendChild(dropDown);

  }
  
}
//To get data
function errData(err){
  console.log("Error");
  console.log(err);

}

//***********************************************Function to submit form*********************************************************//
//function to execute when the submit button is pressed
// e is for event
function submitForm(e){
  e.preventDefault();
  
  //getting all the data from the form
  let data = {
    ProjectName:getElementVal("ProjectName"),
    Address:getElementVal("Address"),
    ProjectManager:getElementVal("ProjectManager"),
    MatsUsed:getElementVal("MatsUsed")
  }
  let formDB = database.ref("/Picasso/");
  //pushing the data to the databases
  formDB.push(data);

  //showing an alert at the top to conform that the data has been sent
  showAlert();

  //resetting the form
  document.getElementById("Form").reset();
  
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


