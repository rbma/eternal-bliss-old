!function(a){a.fn.marquee=function(b){return this.each(function(){var e,f,g,h,i,c=a.extend({},a.fn.marquee.defaults,b),d=a(this),j=3,k="animation-play-state",l=!1,m=function(a,b,c){for(var d=["webkit","moz","MS","o",""],e=0;e<d.length;e++)d[e]||(b=b.toLowerCase()),a.addEventListener(d[e]+b,c,!1)},n=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c+":"+a[c]);return b.push(),"{"+b.join(",")+"}"},o=function(){d.timer=setTimeout(F,c.delayBeforeStart)},p={pause:function(){l&&c.allowCss3Support?e.css(k,"paused"):a.fn.pause&&e.pause(),d.data("runningStatus","paused"),d.trigger("paused")},resume:function(){l&&c.allowCss3Support?e.css(k,"running"):a.fn.resume&&e.resume(),d.data("runningStatus","resumed"),d.trigger("resumed")},toggle:function(){p["resumed"==d.data("runningStatus")?"pause":"resume"]()},destroy:function(){clearTimeout(d.timer),d.css("visibility","hidden").html(d.find(".js-marquee:first")),setTimeout(function(){d.css("visibility","visible")},0)}};if("string"==typeof b)return a.isFunction(p[b])&&(e||(e=d.find(".js-marquee-wrapper")),d.data("css3AnimationIsSupported")===!0&&(l=!0),p[b]()),void 0;var r;a.each(c,function(a){if(r=d.attr("data-"+a),"undefined"!=typeof r){switch(r){case"true":r=!0;break;case"false":r=!1}c[a]=r}}),c.duration=c.speed||c.duration,h="up"==c.direction||"down"==c.direction,c.gap=c.duplicated?c.gap:0,d.wrapInner('<div class="js-marquee"></div>');var s=d.find(".js-marquee").css({"margin-right":c.gap,"float":"left"});if(c.duplicated&&s.clone(!0).appendTo(d),d.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),e=d.find(".js-marquee-wrapper"),h){var t=d.height();e.removeAttr("style"),d.height(t),d.find(".js-marquee").css({"float":"none","margin-bottom":c.gap,"margin-right":0}),c.duplicated&&d.find(".js-marquee:last").css({"margin-bottom":0});var u=d.find(".js-marquee:first").height()+c.gap;c.duration=(parseInt(u,10)+parseInt(t,10))/parseInt(t,10)*c.duration}else i=d.find(".js-marquee:first").width()+c.gap,f=d.width(),c.duration=(parseInt(i,10)+parseInt(f,10))/parseInt(f,10)*c.duration;if(c.duplicated&&(c.duration=c.duration/2),c.allowCss3Support){var v=document.body||document.createElement("div"),w="marqueeAnimation-"+Math.floor(1e7*Math.random()),x="Webkit Moz O ms Khtml".split(" "),y="animation",z="",A="";if(v.style.animation&&(A="@keyframes "+w+" ",l=!0),l===!1)for(var B=0;B<x.length;B++)if(void 0!==v.style[x[B]+"AnimationName"]){var C="-"+x[B].toLowerCase()+"-";y=C+y,k=C+k,A="@"+C+"keyframes "+w+" ",l=!0;break}l&&(z=w+" "+c.duration/1e3+"s "+c.delayBeforeStart/1e3+"s infinite "+c.css3easing,d.data("css3AnimationIsSupported",!0))}var D=function(){e.css("margin-top","up"==c.direction?t+"px":"-"+u+"px")},E=function(){e.css("margin-left","left"==c.direction?f+"px":"-"+i+"px")};c.duplicated?(h?e.css("margin-top","up"==c.direction?t:"-"+(2*u-c.gap)+"px"):e.css("margin-left","left"==c.direction?f+"px":"-"+(2*i-c.gap)+"px"),j=1):h?D():E();var F=function(){if(c.duplicated&&(1===j?(c._originalDuration=c.duration,c.duration=h?"up"==c.direction?c.duration+t/(u/c.duration):2*c.duration:"left"==c.direction?c.duration+f/(i/c.duration):2*c.duration,z&&(z=w+" "+c.duration/1e3+"s "+c.delayBeforeStart/1e3+"s "+c.css3easing),j++):2===j&&(c.duration=c._originalDuration,z&&(w+="0",A=a.trim(A)+"0 ",z=w+" "+c.duration/1e3+"s 0s infinite "+c.css3easing),j++)),h?c.duplicated?(j>2&&e.css("margin-top","up"==c.direction?0:"-"+u+"px"),g={"margin-top":"up"==c.direction?"-"+u+"px":0}):(D(),g={"margin-top":"up"==c.direction?"-"+e.height()+"px":t+"px"}):c.duplicated?(j>2&&e.css("margin-left","left"==c.direction?0:"-"+i+"px"),g={"margin-left":"left"==c.direction?"-"+i+"px":0}):(E(),g={"margin-left":"left"==c.direction?"-"+i+"px":f+"px"}),d.trigger("beforeStarting"),l){e.css(y,z);var b=A+" { 100%  "+n(g)+"}",k=a("style");0!==k.length?k.filter(":last").append(b):a("head").append("<style>"+b+"</style>"),m(e[0],"AnimationIteration",function(){d.trigger("finished")}),m(e[0],"AnimationEnd",function(){F(),d.trigger("finished")})}else e.animate(g,c.duration,c.easing,function(){d.trigger("finished"),c.pauseOnCycle?o():F()});d.data("runningStatus","resumed")};d.bind("pause",p.pause),d.bind("resume",p.resume),c.pauseOnHover&&d.bind("mouseenter mouseleave",p.toggle),l&&c.allowCss3Support?F():o()})},a.fn.marquee.defaults={allowCss3Support:!0,css3easing:"linear",easing:"linear",delayBeforeStart:1e3,direction:"left",duplicated:!1,duration:5e3,gap:20,pauseOnCycle:!1,pauseOnHover:!0}}(jQuery);