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
  let ContractorName;
  let ProjectManager;
  let projectAddress;
  //console.log(data.val());
  let objectData = data.val();
  let keys = Object.keys(objectData);
  //console.log(keys);

  for(var i = 0; i < keys.length; i++)
  {

    let k = keys[i];
    ProjectName           =objectData[k].ProjectName;
    ContractorName        =objectData[k].ContractorName;
    ProjectManager        =objectData[k].ProjectManager;
    projectAddress        =objectData[k].projectAddress;

    //Creating a list to put the data in
    let li = document.createElement("ul");
    li.className="list";
    li.id="list";
    li.innerHTML='<table class="projectTable">' +
                '<tr>'+'<th>'+"Project Name: "+'</th>'+'<th>'+ ProjectName +'</th>'+'</tr>'+
                '<tr>'+'<th>'+"Contractor Name: " +'</th>'+'<th>'+ContractorName+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"Project Manager: "+ '</th>'+'<th>' +ProjectManager+'</th>' + '</tr>'+
                '<tr>'+'<th>'+"project Address: "+ '</th>'+'<th>' + projectAddress+'</th>' + '</tr>'
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
  cl.className="close1";
  cl.textContent="Delete Project";
  cl.addEventListener("click", function(){
    if (confirm("Are you sure you want to delete the project")) {
      database.ref('Picasso/' + k).remove();
    } else {
    }
    
    
    //window.location.reload();
  });

  
  //creating a div to put the retrived data in
  let Para = document.createElement('div');
  Para.className="P1"
  //appending to html
  let seeMore = document.createElement("button");
  seeMore.className="seeMore";
  seeMore.innerHTML="<a href='http://127.0.0.1:5500/form.html' style='text-decoration:none;' alt='Broken Link' target='_blank'>see More</a>";
  seeMore.onclick=function(){
    localStorage.setItem("value",k);
    console.log(k);
  };
  
  
  Para.appendChild(li);
  newDiv.appendChild(Para);
  newDiv.appendChild(cl);
  newDiv.appendChild(seeMore);
  // newDiv.appendChild(dropDownDiv);
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
    ContractorName:getElementVal("ContractorName"),
    ContractorPN:getElementVal("ContractorPN"),
    ProjectManager:getElementVal("ProjectManager"),
    ProjectManagerPN:getElementVal("ProjectManagerPN"),
    PaintStoreManagerName:getElementVal("PaintStoreManagerName"),
    PaintStoreManagerPN:getElementVal("PaintStoreManagerPN"),
    leadPinterName:getElementVal("leadPinterName"),
    leadPinterPN:getElementVal("leadPinterPN"),
    paintStoreName:getElementVal("paintStoreName"),
    paintStoreAddress:getElementVal("paintStoreAddress"),
    paintStorePN:getElementVal("paintStorePN"),
    projectAddress:getElementVal("projectAddress")
  }
  let formDB = database.ref("Picasso/");
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
showTab(currentTab); // Display the current tab

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



