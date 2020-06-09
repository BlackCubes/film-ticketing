/*! modernizr 3.11.2 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csstransforms-setclasses !*/
!function(e,n,t,r){function o(e,n){return typeof e===n}function s(e,n){return!!~(""+e).indexOf(n)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=i(_?"svg":"body"),e.fake=!0),e}function a(e,n,r,o){var s,a,f,u,c="modernizr",d=i("div"),p=l();if(parseInt(r,10))for(;r--;)f=i("div"),f.id=o?o[r]:c+(r+1),d.appendChild(f);return s=i("style"),s.type="text/css",s.id="s"+c,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",u=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=u,S.offsetHeight):d.parentNode.removeChild(d),!!a}function f(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(e,t,r){var o;if("getComputedStyle"in n){o=getComputedStyle.call(n,e,t);var s=n.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(s){var i=s.error?"error":"log";s[i].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&e.currentStyle&&e.currentStyle[r];return o}function c(e,t){var o=e.length;if("CSS"in n&&"supports"in n.CSS){for(;o--;)if(n.CSS.supports(f(e[o]),t))return!0;return!1}if("CSSSupportsRule"in n){for(var s=[];o--;)s.push("("+f(e[o])+":"+t+")");return s=s.join(" or "),a("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"===u(e,null,"position")})}return r}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function p(e,n,t,l){function a(){u&&(delete z.style,delete z.modElem)}if(l=!o(l,"undefined")&&l,!o(t,"undefined")){var f=c(e,t);if(!o(f,"undefined"))return f}for(var u,p,m,y,v,h=["modernizr","tspan","samp"];!z.style&&h.length;)u=!0,z.modElem=i(h.shift()),z.style=z.modElem.style;for(m=e.length,p=0;p<m;p++)if(y=e[p],v=z.style[y],s(y,"-")&&(y=d(y)),z.style[y]!==r){if(l||o(t,"undefined"))return a(),"pfx"!==n||y;try{z.style[y]=t}catch(e){}if(z.style[y]!==v)return a(),"pfx"!==n||y}return a(),!1}function m(e,n){return function(){return e.apply(n,arguments)}}function y(e,n,t){var r;for(var s in e)if(e[s]in n)return!1===t?e[s]:(r=n[e[s]],o(r,"function")?m(r,t||n):r);return!1}function v(e,n,t,r,s){var i=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+b.join(i+" ")+i).split(" ");return o(n,"string")||o(n,"undefined")?p(l,n,r,s):(l=(e+" "+E.join(i+" ")+i).split(" "),y(l,n,t))}function h(e,n,t){return v(e,r,r,n,t)}var g=[],C={_version:"3.11.2",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var w=[],S=t.documentElement,_="svg"===S.nodeName.toLowerCase(),x="Moz O ms Webkit",b=C._config.usePrefixes?x.split(" "):[];C._cssomPrefixes=b;var P={elem:i("modernizr")};Modernizr._q.push(function(){delete P.elem});var z={style:P.elem.style};Modernizr._q.unshift(function(){delete z.style});var E=C._config.usePrefixes?x.toLowerCase().split(" "):[];C._domPrefixes=E,C.testAllProps=v,C.testAllProps=h,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),function(){var e,n,t,r,s,i,l;for(var a in g)if(g.hasOwnProperty(a)){if(e=[],n=g[a],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],l=i.split("."),1===l.length?Modernizr[l[0]]=r:(Modernizr[l[0]]&&(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean)||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=r),w.push((r?"":"no-")+l.join("-"))}}(),function(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(n+=" "+t+e.join(" "+t)),_?S.className.baseVal=n:S.className=n)}(w),delete C.addTest,delete C.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,window,document);