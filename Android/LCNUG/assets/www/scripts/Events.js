 function loadEvents()
 {	
	   var storage = window.localStorage;
	   var txt="";
	   var feedString = storage.feedString;
	   var jsonFeed = jQuery.parseJSON(feedString);
	   if(jsonFeed.channel.item.length>0)
	   {
	   	  for(i = 0; i<jsonFeed.channel.item.length; i++)
	   	  {
		      txt+="<li><a href='EventDetail.html?EventId="+ i.toString() +"' rel='external' data-ajax='false'>"+jsonFeed.channel.item[i].title+"</a></li>";
	      }
	      document.getElementById("myEvents").innerHTML=txt;
	   }
	   $("myEvents").listview("refresh");
 };