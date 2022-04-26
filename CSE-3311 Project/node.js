//send website html elements to values that can be used in code.

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var btn4 = document.getElementById("myBtn4");
var btn5 = document.getElementById("myBtn5");
var btn6 = document.getElementById("myBtn6");


var sortBtn = document.getElementById("SortButton");
var sortIn = document.getElementById("sort_in");
var exit = document.getElementById("exit-sorting");
var type = document.getElementById("Type-Selection");
var order = document.getElementById("Order-Selection");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

var sorter = document.getElementById("sort_input");

// When the user clicks the button, open the modal 
btn.onclick = function(){
  modal.style.display = "block";
};

//Displays the Store form
btn2.onclick = function(){
  modal2.style.display = "block";
};

//Moves the previous store
btn3.onclick = function(){
  let y = localStorage.getItem('x');
  if(y != null)
    x = parseInt(y);
  x--;
  if(x<0)
    x++;
  nextStore(x);
  localStorage.setItem('x', x);
};

//Moves to the Next store
btn4.onclick = function(){
  let y = localStorage.getItem('x');
  if(y != null)
    x = parseInt(y);
  x++;
  if(x > parseInt(localStorage.getItem("StoreAmount"))-1)
    x--;
  nextStore(x);
  localStorage.setItem('x', x);
};

//Deletes the current store
btn5.onclick = function(){
  var check = window.confirm("Are you sure you want to delete this store?");
  if(check)
  {
    let store = localStorage.getItem("Store"+localStorage.getItem("DefaultStore"));
    delStore(store);
  }
};

//undisplay sort box and retrieve new data with new sort parameters
btn6.onclick = function(){
  sortIn.style.display = "none";
  getData();
};

//undisplay sort box
exit.onclick = function(){
  sortIn.style.display = "none";
};

//display sort box
sortBtn.onclick = function(){
  sortIn.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span[0].onclick = function() {
  modal.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span[1].onclick = function(){
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if(event.target == modal2){
    modal2.style.display = "none";
  }
};


var currentTab = 0;
var currentTab1 = 1;// Current tab is set to be the first tab (0)
showTab(1); // Display the current tab
showTab(0); // Displays the Store From Tab

//Anmol's Input
function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  x[n-1].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // if (n == 0) {
  //   document.getElementById("prevBtn").style.display = "none";
  //   document.getElementById("submitId").style.display="none";
  //   document.getElementById("nextBtn").innerHTML = "Next";
  // } else {
  //   document.getElementById("prevBtn").style.display = "inline";
  // }
  // if (n == (x.length - 1)) {
    
  //   document.getElementById("submitId").style.display="inline";
  //   document.getElementById("nextBtn").style.display = "none";
  // }
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("submitId").style.display = "none";

  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length-1)) {
    document.getElementById("submitId").style.display = "inline";
    //document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

//Anmol's Input
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
  // if (currentTab >= x.length) {
  //   return false;
  // }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

//Anmol's Input
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

//Anmol's Input
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

showtab(0);