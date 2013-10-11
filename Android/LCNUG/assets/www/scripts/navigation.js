function navigate(e)
{
	switch(e)
	{
		case 'Up Next':
			loadXMLDoc();
			window.location.href="#tabstrip-UpNext";
			break;
		case 'Events':
			loadEvents();
			window.location.href="#tabstrip-Events";
			break;
		case 'Map':
			window.location.href="#tabstrip-Map";
			break;
		case 'About':
			window.location.href="#tabstrip-About";
			break;
		case 'More':
			window.location.href="#tabstrip-More";
			break;
		default:
			loadXMLDoc();
			window.location.href="#tabstrip-UpNext";
			break;
	}
};

//<script language=”javascript” type=”text/javascript”>
//window.location.href=”login.jsp?backurl=”+window.location.href;
//</script>
