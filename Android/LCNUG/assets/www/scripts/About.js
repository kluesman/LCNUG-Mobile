 function loadAbout()
 {
		document.getElementById("myEvents").innerHTML="<li></li>";
		document.getElementById("eventList").style.visibility = "hidden";
 		var txt = "<p>Lake County .Net User's Group normally meets from 7-9 PM on the second Thursday of the month at the College of Lake County in Grayslake, Illinois. "
 				 +"Every month there is a different speaker presenting on various Microsoft technologies. November and December meetings are on different dates. "
 				 +"The College of Lake County provides space for us in the Technology Building in room T326-328. Please register before each meeting.</p>";
		document.getElementById('myDiv').style.visibility = 'visible';
		document.getElementById("myDiv").innerHTML="";
		document.getElementById("myDiv").innerHTML=txt;
			
 };