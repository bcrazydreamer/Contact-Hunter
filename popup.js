chrome.runtime.onMessage.addListener(function(request, sender) {
  var mainOutput = document.querySelector('#main-output');
  if (request.action == "getSource") {
  	var html = '';
  	html += "<div class='col-sm-12 col-xs-12' style='padding:0'>";
  	html += "	<span class='label label-primary custom-badge-1'>Phone</span>";
  	html += "</div>";
  	for(var i = 0 ; i < request.source[0].length ; i++){
  		html += "<div class='contact-main-div col-sm-12 col-xs-12 phone-container'>";
  		html += "<div class='col-sm-2 col-xs-2'>";
  		html += "	<img src='./img/phone.svg' class='contact-img contact-img-phone' />";
  		html += "</div>";
  		html += "<div class='col-sm-10 col-xs-10 contact-text'>";
  		html += "	<span class='contact-number'>"+request.source[0][i][0]+"<span><br>";
  		try{
	  		if(request.source[0][i][1]){
	  			html += "	<span class='contact-country'>"+cc_obj[request.source[0][i][1]].name+"<span><br>";
	  		}else{
	  			html += "	<span class='contact-country'>Can't find country<span><br>";
	  		}
  		}catch(err){
  			html += "	<span class='contact-country'>Can't find country<span><br>";
  		}
  		html += "</div>";
  		html += "</div>";
  	}
  	if(request.source[0].length==0){
  		html += '<center><img class="no-data" src="./img/empty.svg"></center>';
 		html += '<center><span class="no-data-msg">No phone number found!</span></center>';
  	}

  	html += "<hr class='col-sm-12 col-xs-12'/>";
  	html += "<div class='col-sm-12 col-xs-12' style='padding:0'>";
  	html += "	<span class='label label-primary custom-badge-2'>Emails</span>";
  	html += "</div>";

  	for(var i = 0 ; i < request.source[1].length ; i++){
  		html += "<div class='contact-main-div col-sm-12 col-xs-12 email-container'>";
  		html += "<div class='col-sm-2 col-xs-2'>";
  		html += "	<img src='./img/email.svg' class='contact-img' />";
  		html += "</div>";
  		html += "<div class='col-sm-10 col-xs-10 contact-text'>";
  		html += "	<span class='contact-number' title='"+request.source[1][i]+"'>"+request.source[1][i]+"<span><br>";
  		html += "</div>";
  		html += "</div>";
  	}
  	if(request.source[1].length==0){
  		html += '<center><img class="no-data" src="./img/empty.svg"></center>';
 		html += '<center><span class="no-data-msg">No emails found!</span></center>';
  	}

    mainOutput.innerHTML = html;
  }
});

function onWindowLoad() {

  var mainOutput = document.querySelector('#main-output');
  chrome.tabs.executeScript(null, {
    file: "processResult.js"
  }, function() {
    if (chrome.runtime.lastError) {
      html = '<center><img class="no-data" src="./img/error.svg"></center>'
      html += '<center><span class="no-data-msg">Can not access this page</span></center>'
      mainOutput.innerHTML = html;
    }
  });

}

window.onload = onWindowLoad;