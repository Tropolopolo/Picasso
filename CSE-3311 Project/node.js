
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const array = ["Project-1", "Project-2"];
var i=0;
while(i<array.length)
{
  var dropDown = document.createElement("a");
  var value = document.createTextNode(array[i]);
  dropDown.href="#";
  dropDown.append(value);

  const element = document.getElementById("dropdown-content");
  element.appendChild(dropDown);
  i++;
}
