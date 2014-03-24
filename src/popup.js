// add a link to the logo (cant be a regular href because of tabs.create)
$(document).ready(function(){
  document.getElementById('logoImg')
    .addEventListener('click', 
      function() {
        chrome.tabs.create({ url: 'http://va.mu/?utm_source=chromeplugin&utm_medium=banner&utm_campaign=logo' });
      });
  });

// copies passed content to Clipboard
function _toClipboard(data){
  chrome.runtime.getBackgroundPage(function (bg) {
    var clipboardholder = bg.document.getElementById('clipboardholder');
    clipboardholder.style.display = 'block';
    clipboardholder.value = data;
    clipboardholder.select();
    bg.document.execCommand('Copy');
    clipboardholder.style.display = 'none';
  });
}

// gets the shortened URL and calls buildPopup
function _init(){
  $( document ).ajaxStart(function() {
    $( "#loading" ).show();
    $( "#content" ).hide();
  });

$( document ).ajaxStop(function() {
    $( "#loading" ).hide();
    $( "#content" ).show();
    $( "#success" ).show();
  });

  chrome.tabs.getSelected(null, function(tab) {
  $.get('http://va.mu/api/create/?url='
    + encodeURIComponent(tab.url),
    function (data){
      var cb = localStorage["autoCtrlV"];
      if (cb){
        if (cb == "true") {
          _toClipboard(data);
        }
      }
      buildPopup(data);

    });
  });
}

// does the rest
function buildPopup(shortenedUrl){
  // Add the shortened URL to the popup...
  $("div.content").text(shortenedUrl);


  // checks for autoCtrlV setting in Options pane
  var cb = localStorage["autoCtrlV"];
  if (cb){
    if (cb == "false") {
      // Add the _toClipboard function to the button
      document.getElementById('urlClipboard').addEventListener('click', 
        function() {
          _toClipboard(shortenedUrl)
        });
      $("#urlClipboard").show();
    }
  }

  // add the link to the url stats
  document.getElementById('urlStats').addEventListener('click', 
    function() {
      chrome.tabs.create({ url: shortenedUrl+'+' });
    });
  $("#urlStats").show();
  $("#nwWarning").show();
}

_init();