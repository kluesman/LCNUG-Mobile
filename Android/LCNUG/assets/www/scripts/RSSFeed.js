
 var storage;
 var jsonFeed;
 
 function loadXMLDoc()
 {
	
	document.getElementById('progBar').style.visibility = 'visible'; 
	storage = window.localStorage;
	today=new Date();
	var one_hour=1000*60*60;
	var lastPulled = storage.getItem("lastPulled");
	var lastPulled = lastPulled==null? today.getTime(): parseInt(lastPulled);
	now = today.getTime();
	var hoursPassed = (now-lastPulled) / one_hour;
	var xmlhttp;
   if (window.XMLHttpRequest)
     {// code for IE7+, Firefox, Chrome, Opera, Safari
     xmlhttp=new XMLHttpRequest();
     }
   else
     {// code for IE6, IE5
     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
     }
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
         xmlDoc=xmlhttp.responseXML;
         txt="";
         jsonFeed = $.xml2json(xmlDoc);
         jsonFeed.channel.item.sort(function(x,y) { 
                        return ((Date.parse(x.pubDate) == Date.parse(y.pubDate)) ? 0 : ((Date.parse(x.pubDate) < Date.parse(y.pubDate)) ? 1 : -1 ));
                      } );
         var feedString = JSON.stringify(jsonFeed);
         if(jsonFeed.channel.item.length>0)
         {
            displayFirstItem();
         }
		 
         storage.setItem("feedString", feedString);
         storage.setItem("lastPulled", today.getTime().toString());
      }
    }
    if (navigator.onLine && (hoursPassed >= 4 || hoursPassed ==0)) { 
      xmlhttp.open("GET","http://www.lcnug.org/news.rss",true);
      xmlhttp.send(null); 
    } 
     else
    {
       var feedString = storage.feedString;
       jsonFeed = jQuery.parseJSON(feedString);
       if(jsonFeed.channel.item.length>0)
       {
			displayFirstItem();
       }
    }

 };
 function displayFirstItem()
 {
    var txt ="";
	txt+="<h1>"+jsonFeed.channel.item[0].title+"</h1>";
	txt+=jsonFeed.channel.item[0].description;
	document.getElementById('UpNextInfo').style.visibility = 'visible';
	document.getElementById('UpNextInfo').innerHTML=txt;
	document.getElementById('progBar').style.visibility = 'hidden'; 
 };
 function StringtoXML(text){
                if (window.ActiveXObject){
                  var doc=new ActiveXObject('Microsoft.XMLDOM');
                  doc.async='false';
                  doc.loadXML(text);
                } else {
                  var parser=new DOMParser();
                  var doc=parser.parseFromString(text,'text/xml');
                }
                return doc;
				document.getElementById('progBar').style.visibility = 'hidden';
            };
