 function loadEvents()
 {	
	   var storage = window.localStorage;
	   var txt="";
	   var feedString = storage.getItem("feedString");
     //var feedString = storage.feedString;
	   var jsonFeed = jQuery.parseJSON(feedString);
	   try
	   {
      var dataTemplate = "<a class='details-link' data-role='listview-link' href='\\#tabstrip-eventDetails?id=${guid}'>${title.substring(0,80)}</a>";
	   $("#grouped-listview").kendoMobileListView({
            dataSource: kendo.data.DataSource.create({data: jsonFeed.channel.item}),
            template: dataTemplate,
            fixedHeaders: true
        });
        var listview = document.getElementById("grouped-listview");
        listview.refresh();
	   }
	   catch(err)
	   {
	   }
     
 };
  function showDetailsView(e) {
            var view = e.view;
            var URL = window.location.toString();
           var queryList = URL.split("?");
         
           var stringEventId = queryList[1].split("=")[1];
           var EventId = stringEventId;
           var txt="";
             var storage = window.localStorage;
           var feedString = storage.feedString;
           var jsonFeed = jQuery.parseJSON(feedString);
           if(jsonFeed.channel.item.length>0)
           {
              $.each(jsonFeed.channel.item, function(i, v) {
                if (v.guid == EventId) {
                  txt+="<h2>"+v.title+"</h2>";
                  txt+=v.description;
                  document.getElementById("myEventDetail").innerHTML=txt;;
                  return;
                }
              });
                    
           }
  };