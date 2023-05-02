!function(){"use strict";var e,t={416:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,r=window.wp.blockEditor,l=window.wp.components,o=window.wp.coreData,a=JSON.parse('{"u2":"typroject/ty-project-player"}');(0,e.registerBlockType)(a.u2,{edit:function(e){let{attributes:a,setAttributes:c}=e;const[i]=(0,o.useEntityProp)("root","site","typp_token"),{playerID:u}=a,[p,s]=(0,t.useState)([]),y=()=>{fetch("https://ty.mailstone.net/api/players",{method:"GET",status:"active",headers:{Authorization:i}}).then((e=>e.json())).then((e=>{s(e.filter((e=>"active"==e.status)).map((e=>({label:e.name,value:e.id,type:e.type}))))})).catch((e=>{})).finally((e=>{}))};(0,t.useEffect)((()=>{y()}),[]);const f=[{value:"",label:"Select a Player"}];return(0,t.createElement)("div",(0,r.useBlockProps)(),(0,t.createElement)(r.InspectorControls,{key:"settings"},(0,t.createElement)(l.PanelBody,null,!p&&"Loading",p&&0===p.length&&(0,t.createElement)("p",null,(0,t.createElement)("b",{style:{color:"#d63638"}},"You're not authorized!")),p&&p.length>0&&(0,t.createElement)("p",null,"You're authorized!"),(0,t.createElement)(l.SelectControl,{label:"Select a Static Player",value:u,options:f.concat(p.filter((e=>"static"==e.type))),onChange:e=>c({playerID:e})}),(0,t.createElement)(l.SelectControl,{label:"Select a Dynamic Player",value:u,options:f.concat(p.filter((e=>"dynamic"==e.type))),onChange:e=>c({playerID:e})}))),(0,t.createElement)("div",{onClick:y},(0,n.__)("TY Project Player – hello from the editor!","ty-project-player"),(0,t.createElement)("br",null),(0,t.createElement)("span",null,"Player ID: ",(0,t.createElement)("b",null,a.playerID))))}})}},n={};function r(e){var l=n[e];if(void 0!==l)return l.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=function(t,n,l,o){if(!n){var a=1/0;for(p=0;p<e.length;p++){n=e[p][0],l=e[p][1],o=e[p][2];for(var c=!0,i=0;i<n.length;i++)(!1&o||a>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[i])}))?n.splice(i--,1):(c=!1,o<a&&(a=o));if(c){e.splice(p--,1);var u=l();void 0!==u&&(t=u)}}return t}o=o||0;for(var p=e.length;p>0&&e[p-1][2]>o;p--)e[p]=e[p-1];e[p]=[n,l,o]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,o,a=n[0],c=n[1],i=n[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(l in c)r.o(c,l)&&(r.m[l]=c[l]);if(i)var p=i(r)}for(t&&t(n);u<a.length;u++)o=a[u],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(p)},n=self.webpackChunkty_project_player=self.webpackChunkty_project_player||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var l=r.O(void 0,[431],(function(){return r(416)}));l=r.O(l)}();