var Glitter=(Glitter?Glitter:{}); Glitter.sourceList={};
$(document).ready(function() {
	var branches = $('#sidebar dl.source-list > dd.branch');
	Glitter.sourceList.begin($('#sidebar dl.source-list'));
	branches.each(Glitter.sourceList.init);
	$('#sidebar dl.source-list .active').each(Glitter.sourceList.initActive);
});
Glitter.sourceList.begin=function(list) {
	var c;
	this.list = list;
	this.state = {};
	this.cname = list.attr('data-cookie');
	if(!this.cname) return;
	this.cname = 'sl_'+this.cname;
	this.expires = new Date(2030,1,1);
	c = document.cookie.split(';');
	for(var i=0;i<c.length;i++)
	{
		var s=c[i].split('=');
		if(s[0]==this.cname || s[0]==' '+this.cname && s.length>1)
		{
			var st=unescape(s[1]).split(';');
			for(i=0;i<st.length;i++)
			{
				var n=st[i].split('=');
				this.state[n[0]]=st[i];
			}
			break;
		}
	}
}
Glitter.sourceList.update=function() {
	var x=[];
	if(!this.cname) return;
	for(var i in this.state) x.push(this.state[i]);
	document.cookie=this.cname+'='+encodeURIComponent(x.join(';'))+';path=/;expires='+this.expires.toUTCString();
}
Glitter.sourceList.init=function() {
	var n=$(this),me=Glitter.sourceList,i=$(this).attr('id');
	n.prepend('<span class="expando"></span>');
	n.children('span.expando').click(function() {
		if(n.hasClass('collapsed'))
		{
			n.removeClass('collapsed');
			n.addClass('expanded');
			me.state[i]=i+'=e';
		}
		else
		{
			n.removeClass('expanded');
			n.addClass('collapsed');		
			me.state[i]='';
		}
		me.update();
	});
	if(typeof me.state[i] != 'undefined' && me.state[i].length)
	{
		n.addClass('expanded');
		n.removeClass('collapsed');
	}
	else
	{
		n.addClass('collapsed');
		n.removeClass('expanded');
	}
}
Glitter.sourceList.initActive=function()
{
	var n=$(this),me=Glitter.sourceList;
	for(var p = n.parent(); p; p=p.parent())
	{
		if(p[0]==me.list[0]) break;
		if(p[0].nodeName.toLowerCase()=='dd'||p[0].nodeName.toLowerCase()=='li')
		{
			n.addClass('expanded');
			n.removeClass('collapsed');
			me.state[p.attr('id')]=p.attr('id')+'=e';
		}
	}
	me.update();	
}