function loadEventDetail()
{
	   var URL = window.location.toString();
	   var queryList = URL.split("?");
	 
	   var stringEventId = queryList[1].split("=")[1];
	   var EventId = parseInt(stringEventId);
	   var txt="";
       var storage = window.localStorage;
	   var feedString = storage.feedString;
	   var jsonFeed = jQuery.parseJSON(feedString);
	   if(jsonFeed.channel.item.length>0)
         {
            txt+="<h2>"+jsonFeed.channel.item[EventId].title+"</h2>";
            txt+=jsonFeed.channel.item[EventId].description;
            document.getElementById("myEventDetail").innerHTML=txt;
         }
         else
         history.go(-1);
};