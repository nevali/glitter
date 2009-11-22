/* Glitter: Tabs. Straightforward tabbed sections built on jQuery. div.tabs > ul > li > a is each tab. div.tabs > div is each page. */
var Glitter=(Glitter?Glitter:{}); Glitter.tabs={};
$(document).ready(function() {
	var tabs = $('div.tabs > ul > li');
	tabs.each(Glitter.tabs.init);
});
Glitter.tabs.init=function() {
	var a, t, s, i;	
	t = $(this).get(0);
	if(!Glitter.tabs.active && $(this).hasClass('active'))
	{
		Glitter.tabs.active = $(this).get(0);
		i = true;
	}
	else
	{
		$(this).removeClass('active');
		i = false;
	}
	a = $(this).children('a').attr('href');
	if(a.match(/^#/))
	{
		if((s = $(a)) && s.length)
		{
			if(i)
			{
				Glitter.tabs.activePage = s.get(0);
				s.addClass('active');
			}
			else
			{
				s.removeClass('active');
			}
		}
		$(this).click(function() {
			var s, hh;
			
			if($(this).get(0) == Glitter.tabs.active) return false;
			$(Glitter.tabs.activePage).removeClass('active');
			$(Glitter.tabs.active).removeClass('active');
			Glitter.tabs.active = $(this).get(0);
			$(this).addClass('active');
			if((s = $(a)) && s.length)
			{
				s.addClass('active');
				Glitter.tabs.activePage = s.get(0);
			}
			return false;
		})
	}
}
