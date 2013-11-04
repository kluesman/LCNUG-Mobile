
var storage;
var jsonFeed;
var jEvents;
var sEventsModel;
var newEvent;
var currentEvent;

(function (global) {
    
        app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        app.application.skin('Flat');
        window.location.href="#tabstrip-upnext"; 
        loadXMLDoc();
    }, false);
    

    function loadXMLDoc()
    {

        currentEvent="";
        newEvent=false;
        app.application.showLoading();
        storage = window.localStorage;
        
        var lastPulled = storage["SessionsLastPulled"];
        lastPulled = lastPulled==null? moment("2013-11-02", "YYYY-MM-DD").format("YYYY-MM-DD"): lastPulled;
        
        var now = moment();
        var lastPulledMoment = moment(lastPulled);
        var DaysPassed = now.diff(lastPulledMoment,'days');
        
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
                app.application.hideLoading();
                storage.setItem("feedString", feedString);
                storage["SessionsLastPulled"] = moment().format("YYYY-MM-DD").toString();
            }
        }
        if (navigator.onLine && (DaysPassed >= 1)) { 
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
            app.application.hideLoading();
    		BindEvents();
        }
    };
    function displayFirstItem()
    {
        var txt ="";
        if(jsonFeed.channel.item[0].title.toUpperCase().substring(0,5) == "LCNUG"){
            txt+="<h1>"+jsonFeed.channel.item[0].title.substring(5,jsonFeed.channel.item[0].title.length)+"</h1>";
        }
        else
        {
            txt+="<h1>"+jsonFeed.channel.item[0].title+"</h1>";
        }
        var firstLocation = jsonFeed.channel.item[0].description.indexOf("eventbrite.com/");
        if(firstLocation>0)
        {
            var finalLocationQuotes = jsonFeed.channel.item[0].description.indexOf('"', firstLocation);
            var finalLocationAngle = jsonFeed.channel.item[0].description.indexOf('<', firstLocation);
            var registrationlink="http://www."+jsonFeed.channel.item[0].description.substring(firstLocation, finalLocationQuotes<finalLocationAngle?finalLocationQuotes:finalLocationAngle);
            txt+='<br/><center><button class="gridButton" onclick="RegisterForEvent(\''+registrationlink+'\');" data-transition="slide" >Register for Event!</button></center><br/><br/>';
        }
        txt+=jsonFeed.channel.item[0].description.replace("href="," blanks=").replace("href = "," blanks=").replace("href ="," blanks=").replace("href= "," blanks=").replace('href="http://www.',' blanks="http://www/');
        document.getElementById('UpNextInfo').style.visibility = 'visible';
        document.getElementById('UpNextInfo').innerHTML=txt;
        app.application.hideLoading();
        BindEvents();
    };
    function BindEvents()
    {	
        newEvent=false;
        jEvents = jsonFeed.channel.item;
        sEventsModel = {
            Events: ko.observableArray(jEvents),
            SelectedEvent : EventSelect
        };
		ko.applyBindings(sEventsModel, document.getElementById('EventsList'));
    };
    function EventSelect(e) {
        var txt ="";
        if(e.title.toUpperCase().substring(0,5) == "LCNUG"){
            txt+="<h1>"+e.title.substring(5,e.title.length)+"</h1>";
        }
        else
        {
            txt+="<h1>"+e.title+"</h1>";
        }
        if(e.guid.toString()==currentEvent)
        {
            newEvent=false;
        }
        else
        {
            currentEvent=e.guid.toString();
            newEvent = true;
        }
        txt+=e.description.replace("href="," blanks=").replace("href = "," blanks=").replace("href ="," blanks=").replace("href= "," blanks=").replace('href="http://www.',' blanks="http://www/');
        document.getElementById('EventInfo').style.visibility = 'visible';
        document.getElementById('EventInfo').innerHTML=txt;
        window.location.href="#tabstrip-eventinfo"; 
    };
})(window);
function LoadDirections() { 
	window.open('http://maps.apple.com/?q=19351%20West%20Washington%20Street,%20Grayslake,%20IL%2060030', '_system');
}
function RegisterForEvent(link) { 
	window.open(link, '_blank');
}
function ContactLCNUG() { 
	window.open('mailto:organizers@lcnug.org?Subject=LCNUG%20Application', '_system');
}
function ContactByteables() { 
	window.open('mailto:development@byteables.com?Subject=LCNUG', '_system');
}
function onEventPage(e)
{
    if(newEvent==true)
    {
        var scroller = e.view.scroller;
        scroller.reset();
    }
};