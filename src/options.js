// Saves options to localStorage.
function save_options() {
  var cb = document.getElementById("autoCtrlV");
  var option = cb.checked;
  localStorage["autoCtrlV"] = option;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Opcões salvas.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var cb = localStorage["autoCtrlV"];
  if (!cb || cb == undefined) {
    localStorage["autoCtrlV"] = "true";
    return;
  } 
  if (cb=="true"){
    document.getElementById("autoCtrlV").checked = true;
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);