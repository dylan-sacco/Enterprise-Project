(self.webpackJsonp=self.webpackJsonp||[]).push([[2],{484:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var i=n(1),o=n(32),s=n.n(o),r=n(0),a=n(656),c=n(2);function l(e){return r.createElement(a.a,{visible:e.visible,onDismiss:e.onDismiss},r.createElement(c.b,{style:d.modal,className:e.className},e.onDismiss?r.createElement("button",{className:Object(i.css)(d.close),onClick:e.onDismiss,"data-test-id":"modal-close"},"✕"):null,e.children))}const d=i.StyleSheet.create({modal:{display:"flex",flexDirection:"column",position:"relative",textAlign:"center",borderRadius:4,boxShadow:Object(c.c)("popover"),backgroundColor:Object(c.a)("content"),color:Object(c.a)("text")},close:{appearance:"none",borderRadius:"1em",outline:0,padding:0,position:"absolute",right:"-1em",top:"-1em",width:"2em",height:"2em",background:Object(c.a)("text"),border:"2px solid ".concat(Object(c.a)("content")),boxShadow:"0 1.5px 3px rgba(0, 0, 0, .16)",color:Object(c.a)("content"),fontSize:"1em",fontWeight:"bold",textAlign:"center"}});function p(){return(p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function u(e){const{title:t,children:n,...o}=e;return r.createElement(l,p({},o,{className:s()(Object(i.css)(!1!==e.autoSize&&m.small),e.className)}),t?r.createElement("div",{className:Object(i.css)(m.title)},t):null,r.createElement("div",{className:Object(i.css)(t?m.bottom:m.content)},n))}const m=i.StyleSheet.create({small:{minWidth:360,minHeight:0,maxWidth:420,maxHeight:"calc(100% - 100px)"},title:{height:72,fontSize:24,width:"100%",lineHeight:"24px",display:"flex",flexShrink:0,alignItems:"center",justifyContent:"center",borderBottom:"1px solid ".concat(Object(c.a)("border-editor"))},bottom:{padding:"16px 24px 24px 24px",overflow:"auto"},content:{padding:24,overflow:"auto"}})},510:function(e,t,n){"use strict";function i(){return"https://expo.dev"}function o(){return"https://snack.expo.dev"}n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}))},520:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(510),o=n(165);function s(e){const t=Object(o.a)({hideQueryParams:"true",...null!=e&&e.saveToAccount?{saveToAccount:"true"}:{}});return"".concat(Object(i.b)(),"/login?redirect_uri=").concat(encodeURIComponent(t))}},535:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n(1),o=n(32),s=n.n(o),r=n(0),a=n(2);function c(e){return r.createElement("label",{className:s()(Object(i.css)(l.container),e.className)},r.createElement("span",{className:Object(i.css)(l.label)},e.label),r.createElement("span",{className:Object(i.css)(l.switch,e.checked?l.active:l.inactive)}),r.createElement("input",{type:"checkbox",checked:e.checked,onChange:e.onChange,className:Object(i.css)(l.check)}))}const l=i.StyleSheet.create({container:{display:"flex",alignItems:"center",margin:8,cursor:"pointer",whiteSpace:"nowrap"},switch:{display:"inline-block",verticalAlign:-4,width:36,height:20,borderRadius:12,border:"1px solid ".concat(Object(a.a)("border")),backgroundColor:Object(a.a)("background"),":before":{content:'""',display:"inline-block",height:14,width:14,borderRadius:7,margin:2,transition:".2s",transform:"translateX(0)"}},inactive:{":before":{transform:"translateX(0)",backgroundColor:Object(a.a)("soft")}},active:{":before":{transform:"translateX(16px)",backgroundColor:Object(a.a)("primary")}},check:{display:"none"},label:{flex:1,padding:"0 .5em",fontWeight:"normal"}})},604:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n(1),o=n(32),s=n.n(o),r=n(0),a=n(2);function c(e){return r.createElement("span",{className:s()(Object(i.css)(l.buttons,e.disabled&&l.disabled),e.className)},e.options.map(t=>r.createElement("button",{key:t.value,className:Object(i.css)(l.button,t.value===e.value?e.disabled?l.activeDisabled:l.active:void 0),onClick:()=>e.onValueChange(t.value)},t.label)))}const l=i.StyleSheet.create({disabled:{opacity:.5,pointerEvents:"none",cursor:"not-allowed"},buttons:{display:"flex",alignItems:"center",whiteSpace:"nowrap"},button:{appearance:"none",outline:0,margin:0,border:"1px solid ".concat(Object(a.a)("border")),borderLeftWidth:0,backgroundColor:Object(a.a)("content"),color:Object(a.a)("text"),lineHeight:1,padding:6,":first-of-type":{borderLeftWidth:1,borderRadius:"3px 0 0 3px",padding:"6px 12px"},":last-of-type":{borderRadius:"0 3px 3px 0",padding:"6px 12px"},":only-of-type":{borderLeftWidth:1,borderRadius:"3px",padding:"6px 12px"},":hover":{backgroundColor:Object(a.a)("hover")}},active:{backgroundColor:Object(a.a)("primary"),borderColor:Object(a.a)("primary"),color:Object(a.a)("primary-text"),":hover":{backgroundColor:Object(a.a)("primary")}},activeDisabled:{backgroundColor:Object(a.a)("disabled"),color:Object(a.a)("text"),":hover":{backgroundColor:Object(a.a)("disabled")}}})},605:function(e,t,n){e.exports=n.p+"assets/d14a681a76bdb229e305aa965b54dd18.png"},606:function(e,t,n){e.exports=n.p+"assets/d93a5d445d7b7a8be13f38362a9dcf7e.png"},607:function(e,t,n){e.exports=n.p+"assets/e95fe5167b7dfc17a242d6a9f10a60c3.png"},653:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(9);var i=n(1),o=n(0),s=n(174),r=n.n(s),a=n(2);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function l(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class d extends o.Component{constructor(...e){super(...e),l(this,"state",{dismissing:!1}),l(this,"_container",document.createElement("div")),l(this,"_timer",void 0),l(this,"_scheduleDismiss",()=>{this._timer=setTimeout(this._handleDismiss,this.props.timeout)}),l(this,"_cancelDismiss",()=>{this.setState({dismissing:!1}),clearTimeout(this._timer)}),l(this,"_handleDismiss",()=>{this.setState({dismissing:!0}),this._timer=setTimeout(()=>{var e,t;null===(e=(t=this.props).onDismiss)||void 0===e||e.call(t)},400)})}componentDidMount(){let e=document.getElementById("__toast_group__container");e||(e=document.createElement("div"),e.id="__toast_group__container",Object.assign(e.style,{position:"fixed",bottom:"3em",left:"1em",zIndex:"999"}),document.body.appendChild(e)),e.appendChild(this._container),this.props.persistent&&this._scheduleDismiss()}componentWillUnmount(){const e=document.getElementById("__toast_group__container");e&&e.removeChild(this._container),this._cancelDismiss()}render(){const e=this.props.persistent?{}:{onMouseEnter:this._cancelDismiss,onMouseLeave:this._scheduleDismiss};return r.a.createPortal(o.createElement(a.b,c({},e,{style:p.toast,className:Object(i.css)(this.state.dismissing?p.dismissing:p.appearing)}),o.createElement("div",{className:Object(i.css)(p.label)},this.props.label),this.props.actions.map(e=>{var t;return o.createElement("button",{key:e.label,className:Object(i.css)(p.button),onClick:null!==(t=e.action)&&void 0!==t?t:this._handleDismiss},e.label)})),this._container)}}l(d,"defaultProps",{timeout:5e3});const p=i.StyleSheet.create({toast:{display:"flex",margin:"1em",padding:"0 .75em",borderRadius:3,border:"1px solid ".concat(Object(a.a)("border")),boxShadow:Object(a.c)("popover"),minWidth:"27em",whiteSpace:"nowrap",backgroundColor:Object(a.a)("content"),color:Object(a.a)("text")},appearing:{animationName:{from:{opacity:0},to:{opacity:1}},animationDuration:"250ms",opacity:1},dismissing:{animationName:{from:{opacity:1},to:{opacity:0}},animationDuration:"400ms",opacity:0},label:{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",padding:".75em"},button:{appearance:"none",background:"transparent",color:Object(a.a)("primary"),border:"0",textTransform:"uppercase",fontSize:".9em",fontWeight:"bold",padding:"1em",outline:0,":hover":{backgroundColor:Object(a.a)("hover")},":active":{backgroundColor:Object(a.a)("hover")}}})},654:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}));n(175),n(9),n(75);function i(e,t,n="/"){const i=e.split(n),o=t.split(n).slice(0,-1),s=i.pop(),r=i.join(n);let a="";for(;-1===r.indexOf(o.join(n));)o.pop(),a+=".."+n;const c=i.slice(o.length);return c.length&&(a+=c.join(n)+n),a.startsWith(".")||(a="./"+a),a+s}function o(e,t){return new URL(e,"".concat("http://file.io/").concat(function(e){const t=e.split("/");return t.slice(0,t.length-1).join("/")+(t.length>1?"/":"")}(t))).href.replace("http://file.io/","")}},655:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n(165);function o(e){const t=Object(i.a)({name:e.name,description:e.description,platform:e.platform,hideQueryParams:"true",preview:void 0,theme:void 0,supportedPlatforms:void 0},{noEmbedded:!0});try{const n=window.open(t);if(!n)throw new Error("No window");n.__snack_embedded_session={name:e.name,description:e.description,files:e.files,dependencies:e.dependencies,sdkVersion:e.sdkVersion,platform:e.platform}}catch(e){throw new Error("Failed to pass snack content to full window ".concat(e.message,"."))}}},656:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n(9);var i=n(1),o=n(0),s=n(174),r=n.n(s);function a(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class c extends o.PureComponent{constructor(...e){super(...e),a(this,"state",{rendered:this.props.visible,initial:!this.props.visible}),a(this,"_container",document.createElement("div")),a(this,"_content",o.createRef()),a(this,"_timer",void 0),a(this,"_handleDismiss",e=>{var t,n;this._content.current&&this._content.current!==e.target&&this._content.current.contains(e.target)||null===(t=(n=this.props).onDismiss)||void 0===t||t.call(n)}),a(this,"_handleKeyDown",e=>{var t,n;27===e.keyCode&&this.props.visible&&(e.preventDefault(),null===(t=(n=this.props).onDismiss)||void 0===t||t.call(n))})}static getDerivedStateFromProps(e){return e.visible?{rendered:!0,initial:!1}:null}componentDidMount(){document.body.appendChild(this._container),document.addEventListener("keydown",this._handleKeyDown)}componentDidUpdate(e){this.props.visible!==e.visible&&(clearTimeout(this._timer),this.props.visible||(this._timer=setTimeout(()=>this.setState({rendered:!1}),300)))}componentWillUnmount(){document.body.removeChild(this._container),document.removeEventListener("keydown",this._handleKeyDown)}render(){return r.a.createPortal(o.createElement("div",{className:Object(i.css)(l.modal,!this.state.initial&&l.initial,this.props.visible?l.visible:l.hidden),onMouseDown:this._handleDismiss},o.createElement("div",{ref:this._content,className:Object(i.css)(l.content)},this.state.rendered?this.props.children:null)),this._container)}}const l=i.StyleSheet.create({modal:{position:"fixed",top:0,left:0,right:0,bottom:0,color:"#fff",zIndex:999,transitionProperty:"opacity",transitionDuration:"200ms","-webkit-font-smoothing":"antialiased"},initial:{backgroundColor:"rgba(24, 29, 37, 0.8)"},content:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},visible:{opacity:1,pointerEvents:"auto"},hidden:{opacity:0,pointerEvents:"none"}})},661:function(e,t,n){"use strict";var i=n(1),o=n(32),s=n.n(o),r=n(0);t.a=({children:e,className:t,onClick:n})=>r.createElement("div",{className:s()(Object(i.css)(a.loading),t),onClick:n},e);const a=i.StyleSheet.create({loading:{":before":{display:"inline-block",content:'""',borderWidth:2,borderStyle:"solid",borderTopColor:"rgba(255, 255, 255, 0.2)",borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",borderLeftColor:"rgba(255, 255, 255, 0.5)",height:16,width:16,borderRadius:"50%",marginLeft:".5em",marginRight:"1em",verticalAlign:-3,animationName:[{from:{transform:"rotate(0deg)"},to:{transform:"rotate(360deg)"}}],animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}}})},662:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(9);var i=n(1),o=n(0),s=n(2);function r(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class a extends o.PureComponent{constructor(...e){super(...e),r(this,"state",{visible:!1}),r(this,"_handleDocumentContextMenu",()=>{this.state.visible&&this._hidePopover()}),r(this,"_handleDocumentClick",e=>{var t;this.state.visible&&(e.target===this._anchor.current||e.target===this._popover.current||null!==(t=this._popover.current)&&void 0!==t&&t.contains(e.target))||this._hidePopover()}),r(this,"_togglePopover",()=>{if(!this.state.visible){var e,t,n,i;const o=null!==(e=null===(t=this._popover.current)||void 0===t?void 0:t.getBoundingClientRect())&&void 0!==e?e:{},s=null!==(n=null===(i=this._anchor.current)||void 0===i?void 0:i.getBoundingClientRect())&&void 0!==n?n:{},r=(o.width-10)/2-s.left;this._popover.current&&this._arrow.current&&(r>0?(this._popover.current.style.left="".concat(r+5,"px"),this._arrow.current.style.left="".concat(s.left-s.width/2+10,"px")):(this._popover.current.style.left="5px",this._arrow.current.style.left="50%"))}this.setState(e=>({visible:!e.visible}))}),r(this,"_hidePopover",()=>this.setState({visible:!1})),r(this,"_anchor",o.createRef()),r(this,"_arrow",o.createRef()),r(this,"_popover",o.createRef())}componentDidMount(){document.addEventListener("click",this._handleDocumentClick),document.addEventListener("contextmenu",this._handleDocumentContextMenu)}componentWillUnmount(){document.removeEventListener("click",this._handleDocumentClick),document.removeEventListener("contextmenu",this._handleDocumentContextMenu)}render(){const{children:e,content:t}=this.props;return o.createElement("div",{className:Object(i.css)(c.container)},o.cloneElement(o.Children.only(e),{ref:this._anchor,onClick:this._togglePopover}),o.createElement("div",{ref:this._popover,className:Object(i.css)(c.popover,this.state.visible?c.visible:c.hidden)},o.createElement("span",{ref:this._arrow,className:Object(i.css)(c.arrow)}),t))}}const c=i.StyleSheet.create({container:{position:"relative",backgroundColor:"inherit"},popover:{position:"absolute",top:"100%",margin:12,width:"18em",borderRadius:3,zIndex:99,backgroundColor:Object(s.a)("content"),border:"1px solid ".concat(Object(s.a)("border")),color:"inherit",transition:"transform .2s, opacity .2s",boxShadow:"".concat(Object(s.c)("popover"),", 0 0 3px rgba(0, 0, 0, 0.08)")},arrow:{position:"absolute",height:16,width:16,top:-9,transform:"translateX(-50%) rotate(45deg)",backgroundColor:"inherit",borderTopLeftRadius:4,boxShadow:"-.5px -.5px 0 rgba(0, 0, 0, .12)",border:0},visible:{opacity:1,transform:"translateX(-50%) translateY(0)"},hidden:{opacity:0,pointerEvents:"none",transform:"translateX(-50%) translateY(-4px)"}})},663:function(e,t,n){e.exports=n.p+"assets/7bc60d33ce267a372e7d7b9807495282.png"},664:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n(0),o=n(192),s=n.n(o),r=n(72),a=n(510),c=n(665);function l(e){const{title:t,meta:n}=function(e){const t=e.id||Object(c.a)(e.name)?"".concat(e.name," - Snack"):r.f,n=e.description===r.c?e.id?r.e:r.d:e.description,i="".concat(Object(a.a)()).concat(e.id?"/".concat(e.id):""),o="https://s3.amazonaws.com/exp-brand-assets/SnackIcon_200.png";return{title:t,description:n,url:i,meta:[{name:"description",content:n},{property:"og:url",content:i},{property:"og:title",content:t},{property:"og:description",content:n},{property:"og:type",content:"website"},{property:"og:image",content:o},{property:"og:image:width",content:"200"},{property:"og:image:height",content:"200"},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@expo"},{name:"twitter:title",content:t},{name:"twitter:description",content:n},{name:"twitter:image",content:o},{name:"robots",content:e.id?"none":"all"}]}}(e);return i.createElement(s.a,{title:t,meta:n})}},665:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(9),n(666);const i=["red","orange","yellow","green","blue","indigo","violet"],o=["mad","bad","blissful","joyous","fascinated","intrigued","curious","amused","thoughtful","playful","courageous","thrilled","funny","great","intelligent","excited","spunky","vigorous","bold","brave","eager","upbeat","privileged","calm","quiet","surprised","carefree","adequate","authentic","blessed","tenacious","honest","supportive","mature","smiling","grounded","trusting","spontaneous","healthy","laughing","graceful","thankful","suspicious","lonely","bossy","shallow","arrogant","tactless","frowning","ranting","moody","crabby","rebellious","vengeful","jealous","cranky","awkward","nervous","restless","grumpy","hazardous","uplifting","happy","gnarly","smart","smelly","juicy","hot","delicious","talking","witty","biased","greedy","ludicrous"],s=["beef jerky","crackers","cashew","peanut","popcorn","hummus","cookie","cookies","edamame","almond","apple","apples","chip","chips","yogurt","mixed nuts","cheese","cereal","donut","donuts","pizza","pretzel","pretzels","waffle","waffles","candy","candies","chocolate","chocolates","truffle","truffles","fudge","bubblegum","marshmallows","pudding","turkish delight","toffee","graham crackers","raisins","cake","churros","scone","scones","pastry","coffee","juice box","milkshake","soda","tea","ice cream","popsicle","banana","bananas","carrot","celery","peach","orange","kiwi","salsa","strawberries","raspberries","blueberries","watermelon","macaroni and cheese","ramen","french fries","bagel","croissant","sandwich","tortilla","tortillas","nachos","bacon","soylent","stroopwafel","stroopwafels"],r=e=>{const[t,n,...r]=e.split(" ");return!o.includes(t)||!i.includes(n)||!s.includes(r.join(" "))}},745:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));n(9);var i=n(1),o=n(0),s=n(520),r=n(172),a=n(2);var c=Object(r.a)((function(e){const{viewer:t}=e;return o.createElement(o.Fragment,null,o.createElement("p",null,"Download Expo Go, sign in with your Expo account and open the project from the “Projects” tab."),o.createElement("p",null,t?o.createElement(o.Fragment,null,"You are currently signed in as ",o.createElement("strong",null,t.username),"."):o.createElement(o.Fragment,null,"You are currently not signed in (",o.createElement("a",{href:Object(s.a)(),className:Object(i.css)(l.logInLink)},"Log in"),").")),o.createElement("div",{className:Object(i.css)(l.previewContainer)},o.createElement("img",{className:Object(i.css)(l.previewScreenshot),src:n(752)})))}));const l=i.StyleSheet.create({previewContainer:{marginBottom:"15px"},previewScreenshot:{height:"246px",width:"302px",borderBottom:"1px solid ".concat(Object(a.a)("border"))},logInLink:{color:Object(a.a)("text")}});function d({className:e}){return o.createElement("p",{className:e},"* Expo Go for iOS does not include a QR code scanner.",o.createElement("br",null),o.createElement("a",{href:"https://blog.expo.io/upcoming-limitations-to-ios-expo-client-8076d01aee1a",target:"_blank"},"Read more."))}var p=n(186);function u({experienceURL:e}){return o.createElement("div",{className:Object(i.css)(m.container)},o.createElement(d,null),o.createElement("p",null,"Download Expo Go on your device and scan this QR code to get started."),o.createElement("div",{className:Object(i.css)(m.qrcode)},o.createElement(p.a,{size:200,experienceURL:e})))}const m=i.StyleSheet.create({container:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"},qrcode:{margin:"1em",height:212,width:212,backgroundColor:Object(a.a)("content","light"),borderRadius:3,boxShadow:Object(a.c)("small"),padding:6}});var h=n(77),b=n(187),f=n(484);function g({selectedId:e,onSelect:t,segments:n}){return o.createElement("div",{className:Object(i.css)(v.container)},n.map(({id:n,text:s})=>o.createElement("button",{onClick:e=>{e.preventDefault(),t(n)},className:Object(i.css)(v.button,e===n?v.selected:null),key:n},o.createElement("span",null,s))))}const v=i.StyleSheet.create({container:{display:"flex",flexDirection:"row",width:"100%",boxShadow:"inset 0 0 0 1px ".concat(Object(a.a)("border")),borderRadius:3,overflow:"hidden"},button:{flex:1,cursor:"pointer",outline:0,border:0,padding:".5em 1em",whiteSpace:"nowrap",textDecoration:"none",transitionDuration:"170ms",transitionProperty:"color, background",transitionTimingFunction:"linear",appearance:"none",backgroundColor:"transparent",":hover":{backgroundColor:Object(a.a)("hover")}},selected:{color:Object(a.a)("text"),backgroundColor:Object(a.a)("selected"),":hover":{backgroundColor:Object(a.a)("selected")}}});class y extends o.Component{render(){const{large:e,visible:t,onDismiss:n,onChangeMethod:s,method:r,isEmbedded:a,experienceURL:l}=this.props,d=[...a?[]:[{id:"account",text:"Account"}],{id:"qr-code",text:"QR Code"}];return o.createElement(f.a,{className:Object(i.css)(e&&j.large),autoSize:!e,visible:t,title:e?void 0:"Run on your device",onDismiss:n},o.createElement("div",{className:Object(i.css)(j.container)},o.createElement(g,{selectedId:r,onSelect:e=>s(e),segments:d}),o.createElement("div",{className:Object(i.css)(j.wrapper)},o.createElement("div",{className:Object(i.css)(j.pages),style:{left:"".concat(100*-d.findIndex(e=>e.id===r),"%")}},d.map(({id:e})=>{let t;switch(e){case"account":t=o.createElement(c,{key:e});break;case"qr-code":t=o.createElement(u,{key:e,experienceURL:l})}return o.createElement("div",{key:e,className:Object(i.css)(j.page),style:{visibility:e===r?"visible":"hidden"}},t)}))),o.createElement("div",{className:Object(i.css)(j.downloadButtons)},o.createElement(b.a,{target:"_blank",href:h.a.links.itunes,className:Object(i.css)(j.button,j.appstore)},"Get iOS App"),o.createElement(b.a,{target:"_blank",href:h.a.links.playstore,className:Object(i.css)(j.button,j.playstore)},"Get Android App"))))}}const j=i.StyleSheet.create({container:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",maxWidth:600},title:{fontSize:"2em",fontWeight:500},button:{flex:1,display:"block",width:208,margin:".5em",backgroundRepeat:"no-repeat",backgroundPosition:".5em center","-webkit-font-smoothing":"initial"},appstore:{backgroundImage:"url(".concat(n(753),")"),backgroundSize:"12px 23px"},playstore:{backgroundImage:"url(".concat(n(754),")"),backgroundSize:"20px 23px"},whyNoQRCode:{opacity:.5,marginTop:"15px",marginBottom:"5px"},large:{minWidth:0,minHeight:0,maxWidth:"calc(100% - 48px)",maxHeight:"calc(100% - 48px)"},wrapper:{width:"100%",overflowX:"hidden",marginTop:16},pages:{position:"relative",display:"flex",flexDirection:"row",width:"300%"},page:{width:"calc(100% / 3)",display:"block",textAlign:"center"},downloadButtons:{display:"flex",flexDirection:"row",width:"100%",marginTop:12}})},748:function(e,t,n){"use strict";n.d(t,"a",(function(){return k}));n(9);var i=n(1),o=n(101),s=n.n(o),r=n(59),a=n.n(r),c=n(0),l=n(653),d=n(126),p=n.n(d),u=n(58),m=n(654);const h=[".js",".ts",".tsx","/index.js","/index.ts","/index.tsx"];function b(e){return{type:"CODE",contents:JSON.stringify({dependencies:p()(e,e=>e.version)},null,2)}}function f(e,t,n=!1){if(e)for(let i=1;i<=t.length;i++){const o=t[i-1].indexOf('"'.concat(e,'"'));if(o>=0)return{fileName:"package.json",startLineNumber:i,endLineNumber:i,startColumn:o+1+(n?e.length+4:0),endColumn:t[i-1].length+(t[i-1].endsWith(",")?0:1)}}return{fileName:"package.json",startLineNumber:1,endLineNumber:t.length,startColumn:1,endColumn:t[t.length-1].length}}function g(e,t,n,i,o,s,r){const a=e.contents.split("\n");let c;try{c=JSON.parse(e.contents)}catch{return[{message:"Invalid JSON.",location:f("",a),severity:4,source:"Dependencies"}]}if("object"!=typeof c||"object"!=typeof c.dependencies)return[{message:"Object 'dependencies' not found.",location:f("",a),severity:4,source:"Dependencies"}];const l=[];for(const e in c)"dependencies"!==e&&l.push({message:"Key '".concat(e,"' is not supported."),location:f(e,a),severity:2,source:"Dependencies"});for(const e in t){const{error:n,handle:i,version:o,wantedVersion:c}=t[e],d=Object(u.b)(e,s);n?l.push({message:n.message,location:f(e,a,!1),severity:4,source:"Dependencies",action:r(e,o,t,s)}):i||Object(u.d)(e,s)||l.push({message:"Resolving '".concat(e,"@").concat(o,"' ..."),location:f(e,a,!1),severity:-1,source:"Dependencies"}),c&&c!==o&&l.push({message:"'".concat(e,"@").concat(o,"' is not the recommended version for SDK ").concat(s,"."),location:f(e,a,!1),severity:Object(u.d)(e,s,!0)?2:3,source:"Dependencies",action:r(e,o,t,s)}),d&&l.push({message:"'".concat(e,"' is deprecated. ").concat(d),location:f(e,a,!1),severity:2,source:"Dependencies"})}for(const e in n)l.push({message:"'".concat(n[e].dependents.join(","),"' requires peer-dependency '").concat(e,"'."),location:f(n[e].dependents[0],a,!1),severity:Object(u.d)(e,s,!0)?2:Object(u.d)(e,s)?3:4,source:"Dependencies",action:r(e,n[e].wantedVersion,t,s)});for(const e in o){const n=o[e];for(const o in n){const a=n[o];if(a.isPackage&&!Object(u.d)(o,s,!0)){if(!t[o]){var d;const e=Object(u.d)(o,s);l.push({message:"'".concat(o,"' is not defined in dependencies."),location:a.location,severity:e?3:4,source:"Dependencies",action:r(o,null!==(d=a.version)&&void 0!==d?d:"*",t,s)})}}else if(!a.isPackage){const t=Object(m.a)(o,e);i[t]||h.find(e=>i[t+e])||l.push({message:"Cannot find file '".concat(o,"'."),location:a.location,severity:4,source:"Dependencies"})}}}return l}var v=n(655),y=n(170);function j(){return(j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function x(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e,t){return class extends c.Component{constructor(e){super(e),x(this,"updateFiles",e=>{this.props.updateFiles(t=>{const n=e(t),i=n["package.json"];return i&&(delete n["package.json"],this.setState(e=>({packageJson:i,annotations:g(i,e.dependencies,e.missingDependencies,e.files,e.filesDependencies,e.sdkVersion,e.getDependencyAction)}),this.updateDependenciesFromPackageJson)),n})}),x(this,"updateDependenciesFromPackageJson",s()(()=>{const e=function(e,t){try{const{dependencies:n}=JSON.parse(e.contents);if("object"!=typeof n)return;return Object.keys(n).forEach(e=>{Object(u.d)(e,t,!0)&&delete n[e]}),n}catch{}}(this.state.packageJson,this.state.sdkVersion);e&&this.props.updateDependencies(t=>{const n={};for(const i in e){const o=e[i],s=t[i];(null==s?void 0:s.version)!==o&&(n[i]={version:o})}for(const i in t)e[i]||(n[i]=null);return n})},1e3)),x(this,"updateDependencies",e=>{const t=b(this.props.updateDependencies(e));this.setState(()=>({packageJson:t}))}),x(this,"checkForMissingDependencies",s()(async()=>{var e;const{default:t}=await Promise.all([n.e(29),n.e(22)]).then(n.bind(null,990)),{files:i,uncheckedFiles:o}=this.state;let s,{filesDependencies:r}=this.state;for(const e of o){const n=i[e];var c;if(n)try{const i=t(n.contents,e);var l;if(!a()(i,this.state.filesDependencies[e]))s=null!==(l=s)&&void 0!==l?l:{...r},s[e]=i}catch{}else if(this.state.filesDependencies[e])s=null!==(c=s)&&void 0!==c?c:{...r},delete s[e]}r=null!==(e=s)&&void 0!==e?e:r,this.setState(e=>({uncheckedFiles:new Set,filesDependencies:r,annotations:s?g(e.packageJson,e.dependencies,e.missingDependencies,e.files,r,e.sdkVersion,e.getDependencyAction):e.annotations}))},1e3)),x(this,"getDependencyAction",(e,n,o,s)=>{return t?{title:"Open full editor to add dependencies",run:this.handleOpenFullEditor}:o[e]?o[e].wantedVersion&&o[e].wantedVersion!==n?{title:"Update to ".concat(o[e].wantedVersion),icon:()=>c.createElement("svg",{className:Object(i.css)(w.icon),viewBox:"0 0 16 16"},c.createElement("path",{d:"M2,5.09257608 L7.47329684,8.31213064 L7.47329684,14.7092088 L2,11.5325867 L2,5.09257608 Z M2.49245524,4.22207437 L7.97432798,1 L13.506361,4.2238509 L7.92838937,7.41965108 L2.49245524,4.22207437 Z M14,5.09352708 L14,11.5325867 L8.47329684,14.7128733 L8.47329684,8.25995389 L14,5.09352708 Z"})),run:()=>this.updateDependencies(()=>({[e]:{version:o[e].wantedVersion}}))}:null!==(r=o[e].error)&&void 0!==r&&r.message.includes("not found in the registry")?{title:"Remove dependency",run:()=>this.updateDependencies(()=>({[e]:null}))}:{title:"Retry",run:()=>this.updateDependencies(()=>({[e]:{version:n}}))}:{title:"Add dependency",icon:()=>c.createElement("svg",{className:Object(i.css)(w.icon),viewBox:"0 0 16 16"},c.createElement("path",{d:"M2,5.09257608 L7.47329684,8.31213064 L7.47329684,14.7092088 L2,11.5325867 L2,5.09257608 Z M2.49245524,4.22207437 L7.97432798,1 L13.506361,4.2238509 L7.92838937,7.41965108 L2.49245524,4.22207437 Z M14,5.09352708 L14,11.5325867 L8.47329684,14.7128733 L8.47329684,8.25995389 L14,5.09352708 Z"})),run:()=>this.updateDependencies(()=>({[e]:{version:n}}))};var r}),x(this,"handleOpenFullEditor",()=>{Object(v.a)(this.props)});const o=b(e.dependencies);this.state={files:{},dependencies:e.dependencies,missingDependencies:e.missingDependencies,sdkVersion:e.sdkVersion,packageJson:o,selectedFile:e.selectedFile,annotations:g(o,e.dependencies,e.missingDependencies,e.files,{},e.sdkVersion,this.getDependencyAction),uncheckedFiles:new Set,filesDependencies:{},getDependencyAction:this.getDependencyAction}}static getDerivedStateFromProps(e,t){var n;const{sdkVersion:i,files:o,dependencies:s,missingDependencies:r,selectedFile:c}=e;let l,{packageJson:d}=t;if(o!==t.files){l=new Set(t.uncheckedFiles);for(const e in o){var p;const n=o[e];"CODE"===n.type&&Object(y.k)(e)&&!Object(y.m)(e)&&n.contents!==(null===(p=t.files[e])||void 0===p?void 0:p.contents)&&l.add(e)}for(const e in t.files)o[e]||l.add(e)}if(!Object(y.j)(c)||a()(d,b(t.dependencies))){const e=b(s);d=a()(e,d)?d:e}return l||o!==t.files||s!==t.dependencies||r!==t.missingDependencies||i!==t.sdkVersion||d!==t.packageJson||c!==t.selectedFile?{files:o,dependencies:s,missingDependencies:r,sdkVersion:i,packageJson:d,selectedFile:c,annotations:s!==t.dependencies||r!==t.missingDependencies||i!==t.sdkVersion?g(d,s,r,o,t.filesDependencies,i,t.getDependencyAction):t.annotations,uncheckedFiles:null!==(n=l)&&void 0!==n?n:t.uncheckedFiles}:null}componentDidMount(){this.checkForMissingDependencies()}componentDidUpdate(e,t){t.uncheckedFiles!==this.state.uncheckedFiles&&this.state.uncheckedFiles.size&&this.checkForMissingDependencies()}render(){const{selectedFile:n}=this.props,{packageJson:i,annotations:o}=this.state,s=!!t&&o.some(({location:e,action:t,severity:i})=>(null==e?void 0:e.fileName)===n&&!!t&&"package.json"!==n&&i>2);return c.createElement(c.Fragment,null,c.createElement(e,j({},this.props,{files:{...this.props.files,"package.json":i},updateFiles:this.updateFiles,updateDependencies:this.updateDependencies,annotations:[...o,...this.props.annotations]})),c.createElement("div",null,s&&c.createElement(l.a,{label:c.createElement("span",null,"Open full editor to add new dependencies"),actions:[{label:"Open",action:this.handleOpenFullEditor}]})))}}}const w=i.StyleSheet.create({icon:{height:16,width:16,fill:"currentColor",verticalAlign:"middle",opacity:.7}})},752:function(e,t,n){e.exports=n.p+"assets/6dcf149da3a69d5ee3fe7fb6933f5fa6.png"},753:function(e,t,n){e.exports=n.p+"assets/ea07de06422d3379a4f579dfc4a779b9.png"},754:function(e,t,n){e.exports=n.p+"assets/54da9e6c3dac08e684c23ebb5a3d2248.png"}}]);