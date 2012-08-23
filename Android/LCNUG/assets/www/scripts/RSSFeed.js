 function loadXMLDoc()
 {


	document.getElementById("myEvents").innerHTML="<li></li>";
	document.getElementById('eventList').style.visibility = 'hidden';
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
        var storage = window.localStorage;
         xmlDoc=xmlhttp.responseXML;
         txt="";
         var jsonFeed = $.xml2json(xmlDoc);
         jsonFeed.channel.item.sort(function(x,y) { 
                        return ((Date.parse(x.pubDate) == Date.parse(y.pubDate)) ? 0 : ((Date.parse(x.pubDate) < Date.parse(y.pubDate)) ? 1 : -1 ));
                      } );
         var feedString = JSON.stringify(jsonFeed);
         var obj = jQuery.parseJSON(feedString);
         if(jsonFeed.channel.item.length>0)
         {
            txt+="<h2>"+jsonFeed.channel.item[0].title+"</h2>";
            txt+=jsonFeed.channel.item[0].description;
			document.getElementById('myDiv').style.visibility = 'visible';
            document.getElementById("myDiv").innerHTML=txt;
         }
         storage.feedString = feedString;
      }
    }
    if (navigator.onLine) { 
      xmlhttp.open("GET","http://www.lcnug.org/news.rss",true);
      xmlhttp.send(); 
    } 
    else
    {
     var storage = window.localStorage;
     var txt ="";
       var feedString = storage.feedString;
       var jsonFeed = jQuery.parseJSON(feedString);
       if(jsonFeed.channel.item.length>0)
       {
          txt+="<h1>"+jsonFeed.channel.item[0].title+"</h1>";
          txt+=jsonFeed.channel.item[0].description;
          document.getElementById("myDiv").innerHTML=txt;
       }
    }

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
            };
