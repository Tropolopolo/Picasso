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
let child = localStorage.getItem("uid");

database.ref("Picasso").child(child).on("value",getData,errData);

//*************************************************Get Data Function*************************************************************//
//To get data
function getData(data){


  let ProjectName;
  let ContractorName;
  let ContractorPN;
  let ProjectManager;
  let ProjectManagerPN;
  let PaintStoreManagerName;
  let PaintStoreManagerPN;
  let leadPinterName;
  let leadPinterPN;
  let paintStoreName;
  let paintStoreAddress;
  let paintStorePN;
  let projectAddress;
  //console.log(data.val());
  let objectData = data.val();
  let keys = Object.keys(objectData);
  //console.log(keys);

    let k = localStorage.getItem("value");
    // ProjectName = objectData[k].ProjectName;
    // Address = objectData[k].Address;
    // ProjectManager = objectData[k].ProjectManager;
    // MatsUsed = objectData[k].MatsUsed;
    ProjectName           =objectData[k].ProjectName;
    ContractorName        =objectData[k].ContractorName;
    ContractorPN          =objectData[k].ContractorPN;
    ProjectManager        =objectData[k].ProjectManager;
    ProjectManagerPN      =objectData[k].ProjectManagerPN;
    PaintStoreManagerName =objectData[k].PaintStoreManagerName;
    PaintStoreManagerPN   =objectData[k].PaintStoreManagerPN;
    leadPinterName        =objectData[k].leadPinterName;
    leadPinterPN          =objectData[k].leadPinterPN;
    paintStoreName        =objectData[k].paintStoreName;
    paintStoreAddress     =objectData[k].paintStoreAddress;
    paintStorePN          =objectData[k].paintStorePN;
    projectAddress        =objectData[k].projectAddress;

    //Creating a list to put the data in
    let li = document.createElement("ul");
    li.className="list";
    li.id="list";
    li.innerHTML='<table class="projectTable">' +
                 '<tr>'+'<th>'+"Project Name: "+'</th>'+'<th>'+ ProjectName +'</th>'+'</tr>'+
                 '<tr>'+'<th>'+"Contractor Name: " +'</th>'+'<th>'+ContractorName+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"Contractor PN: " + '</th>'+'<th>'+ContractorPN +'</th>'+ '</tr>'+
                 '<tr>'+'<th>'+"Project Manager: "+ '</th>'+'<th>' +ProjectManager+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"ProjectManager PN: "+'</th>'+'<th>'+ProjectManagerPN +'</th>'+'</tr>'+
                 '<tr>'+'<th>'+"PaintStoreManager Name: " +'</th>'+'<th>'+PaintStoreManagerName+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"PaintStoreManager PN: " + '</th>'+'<th>'+PaintStoreManagerPN +'</th>'+ '</tr>'+
                 '<tr>'+'<th>'+"leadPinter Name: "+ '</th>'+'<th>' + leadPinterName+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"leadPinter PN: "+ '</th>'+'<th>' + leadPinterPN+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"paintStore Name: " + '</th>'+'<th>'+paintStoreName +'</th>'+ '</tr>'+
                 '<tr>'+'<th>'+"paintStore Address: "+ '</th>'+'<th>' + paintStoreAddress+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"paintStore PN: "+ '</th>'+'<th>' + paintStorePN+'</th>' + '</tr>'+
                 '<tr>'+'<th>'+"project Address: "+ '</th>'+'<th>' + projectAddress+'</th>' + '</tr>'
                 '</table>';

  //Creating a box
  //All this is just to put the data in a box in html, style is in css as Box1 and P1
  //toAdd is a document fragment to put the box in
  //var toAddBox = document.createDocumentFragment();
  //creating a div so that we can give the box an id and class
  let newDiv = document.createElement('div');
  newDiv.id = "Box";
  newDiv.className = 'Box2';



  
  //creating a div to put the retrived data in
  let Para = document.createElement('div');
  Para.className="P1"

  Para.appendChild(li);
  newDiv.appendChild(Para);

  // newDiv.appendChild(dropDownDiv);
  //toAddBox.appendChild(newDiv);
  document.getElementById('body').appendChild(newDiv);


  
}
//To get data
function errData(err){
  console.log("Error");
  console.log(err);
}
