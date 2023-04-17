!function(){"use strict";var e,t={676:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,r=window.wp.blockEditor,l=window.wp.components,a=(window.wp.data,window.wp.coreData),o=JSON.parse('{"u2":"typroject/ty-project-player"}');(0,e.registerBlockType)(o.u2,{edit:function(e){let{attributes:o,setAttributes:i}=e;const[c]=(0,a.useEntityProp)("root","site","typp_token"),{playerID:p}=o,[s,u]=(0,t.useState)([]),y=()=>{fetch("https://ty.mailstone.net/api/players",{method:"GET",status:"active",headers:{Authorization:c}}).then((e=>e.json())).then((e=>{u(e.filter((e=>"active"==e.status)).map((e=>({label:e.name,value:e.id,type:e.type}))))})).catch((e=>{})).finally((e=>{}))};(0,t.useEffect)((()=>{y()}),[]);const f=[{value:"",label:"Select a Player"}];return(0,t.createElement)("div",(0,r.useBlockProps)(),(0,t.createElement)(r.InspectorControls,{key:"settings"},(0,t.createElement)(l.PanelBody,null,!s&&"Loading",s&&0===s.length&&(0,t.createElement)("p",null,(0,t.createElement)("b",null,"You're not authorized!")),s&&s.length>0&&(0,t.createElement)("p",null,"You're authorized!"),(0,t.createElement)(l.SelectControl,{label:"Select a Static Player",value:p,options:f.concat(s.filter((e=>"static"==e.type))),onChange:e=>i({playerID:e})}),(0,t.createElement)(l.SelectControl,{label:"Select a Dynamic Player",value:p,options:f.concat(s.filter((e=>"dynamic"==e.type))),onChange:e=>i({playerID:e})}))),(0,n.__)("TY Project Player – hello from the editor!","ty-project-player"),(0,t.createElement)("br",null),(0,t.createElement)("span",{onClick:y},"Player ID: ",(0,t.createElement)("b",null,o.playerID)),(0,t.createElement)("script",{type:"text/javascript",src:"https://ty.mailstone.net/widget/player.js"}),(0,t.createElement)("script",{defer:!0},'Widget.init("',p,'")'))}})}},n={};function r(e){var l=n[e];if(void 0!==l)return l.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=function(t,n,l,a){if(!n){var o=1/0;for(s=0;s<e.length;s++){n=e[s][0],l=e[s][1],a=e[s][2];for(var i=!0,c=0;c<n.length;c++)(!1&a||o>=a)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(i=!1,a<o&&(o=a));if(i){e.splice(s--,1);var p=l();void 0!==p&&(t=p)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[n,l,a]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,a,o=n[0],i=n[1],c=n[2],p=0;if(o.some((function(t){return 0!==e[t]}))){for(l in i)r.o(i,l)&&(r.m[l]=i[l]);if(c)var s=c(r)}for(t&&t(n);p<o.length;p++)a=o[p],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(s)},n=self.webpackChunkty_project_player=self.webpackChunkty_project_player||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var l=r.O(void 0,[431],(function(){return r(676)}));l=r.O(l)}();