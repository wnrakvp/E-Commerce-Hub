import{r as g,o as m,c as p,a as e,b as E,d as h,F as k,e as P,n as I,w as f,f as d,g as x,h as T,i as O}from"./vendor.195f37e3.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}};N();var L=(s,t)=>{for(const[a,i]of t)s[a]=i;return s};const j={data(){return{isAlertShow:!1}},methods:{hideAlert(){this.isAlertShow=!1}}},C={key:0,class:"alert alert-primary alert-dismissible m-0 border-0",style:{"border-radius":"0"},role:"alert"},M=e("h4",{class:"alert-heading"},"Well done!",-1),K=e("p",null,"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.",-1),R=e("hr",null,null,-1),D=e("p",{class:"mb-0"},"Whenever you need to, be sure to use margin utilities to keep things nice and tidy.",-1);function B(s,t,a,i,o,n){const r=g("router-view");return m(),p(k,null,[o.isAlertShow?(m(),p("div",C,[M,K,R,D,e("button",{type:"button",onClick:t[0]||(t[0]=(...c)=>n.hideAlert&&n.hideAlert(...c)),class:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})])):E("",!0),h(r)],64)}var V=L(j,[["render",B]]);const $="modulepreload",S={},z="/e-commerce-hub-web/",l=function(t,a){return!a||a.length===0?t():Promise.all(a.map(i=>{if(i=`${z}${i}`,i in S)return;S[i]=!0;const o=i.endsWith(".css"),n=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${n}`))return;const r=document.createElement("link");if(r.rel=o?"stylesheet":$,o||(r.as="script",r.crossOrigin=""),r.href=i,document.head.appendChild(r),o)return new Promise((c,u)=>{r.addEventListener("load",c),r.addEventListener("error",u)})})).then(()=>t())},v={skuList:[{_id:1,productId:1,name:"tfndn-50",image:"https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg",desc:"Tom Ford : Noir de Noir 50 ML",isShopee:!1,isLazada:!0},{_id:2,productId:1,name:"tfndn-100",image:"https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dwa2e15b39/images/large/0000102334.jpg",desc:"Tom Ford : Noir de Noir 100 ML",isShopee:!0,isLazada:!0},{_id:3,productId:1,name:"tfndn-250",image:"https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw42fc54f8/images/large/0000102607.jpg",desc:"Tom Ford : Noir de Noir 250 ML",isShopee:!1,isLazada:!0},{_id:4,productId:2,name:"aventus18n01",image:"https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg",desc:"Batch \u0E2B\u0E32\u0E22\u0E32\u0E01 \u0E1B\u0E35 2018",isShopee:!0,isLazada:!0},{_id:5,productId:2,name:"aventus19n01",image:"https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg",desc:"Batch \u0E2B\u0E32\u0E22\u0E32\u0E01 \u0E1B\u0E35 2019",isShopee:!0,isLazada:!0},{_id:6,productId:2,name:"aventus20m01",image:"https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg",desc:"Batch \u0E43\u0E2B\u0E21\u0E48 \u0E1C\u0E25\u0E34\u0E15\u0E15\u0E49\u0E19\u0E1B\u0E35 2020",isShopee:!0,isLazada:!0},{_id:7,productId:2,name:"aventus21p01",image:"https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg",desc:"Batch \u0E43\u0E2B\u0E21\u0E48 \u0E1C\u0E25\u0E34\u0E15\u0E15\u0E49\u0E19\u0E1B\u0E35 2021",isShopee:!0,isLazada:!0}],productList:[{_id:1,name:"Tom Ford : Noir de Noir",desc:'"Noir de Noir is dark, sexy and indulgent. Yin collides with Yang featuring black rose, black truffle and patchouli for an intense, sensual awakening."\u2014TOM FORD',image:"https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg"},{_id:2,name:"Creed : Aventus",desc:"Aventus celebrates strength, vision and success, inspired by the dramatic life of war, peace and romance lived by Emperor Napoleon. The bottle is emblazoned with a silver emblem of a horse and rider.",image:"https://fimgs.net/mdimg/perfume/375x500.9828.jpg"},{_id:3,name:"Jo Malone : Wood Sage & Sea Salt",desc:"\u2018Sea air is mixed with salty and mineral texture of sand and stones. As the scent of driftwood it has natural and fresh sophistication. A complex combination of wood and sea is in its essence. It provides the feeling of freedom and natural spirit.\u2019",image:"https://fimgs.net/mdimg/perfume/375x500.25529.jpg"}]};function H(){return{login(){},getAllProducts(){return Promise.resolve({reason:"OK",result:v.productList})},getProduct(s){return Promise.resolve({reason:"OK",result:v.productList.find(t=>t._id===s)})},getAllSKU(){return Promise.resolve({reason:"OK",result:v.skuList})}}}const w=new H;class _{constructor(t,a,i,o){this.id=t,this.name=a,this.desc=i,this.image=o}}var F={namespaced:!0,state(){return{all:[],one:new _("","","","")}},getters:{all:s=>s.all,one:s=>s.one},mutations:{SET_ALL(s,t){s.all=t},SET_ONE(s,t){s.one=t}},actions:{getAll({commit:s}){return w.getAllProducts().then(({result:t})=>{const a=[];return t.forEach(({_id:i,name:o,desc:n,image:r})=>{a.push(new _(i,o,n,r))}),s("SET_ALL",a),Promise.resolve("200")}).catch(t=>(console.error(t),Promise.resolve("200")))},getOne({commit:s},t){return w.getProduct(t).then(({result:a})=>{let{_id:i,name:o,desc:n,image:r}=a;return s("SET_ONE",new _(i,o,n,r)),Promise.resolve("200")}).catch(a=>(console.error(a),Promise.resolve("200")))},create({commit:s}){return s("SET_ONE",new _("","","","")),Promise.resolve("200")}}};class U{constructor(t,a,i,o,n,r,c){this.id=t,this.productId=a,this.name=i,this.desc=o,this.image=n,this.isShopee=r,this.isLazada=c}}var W={namespaced:!0,state(){return{all:[],productId:null}},getters:{all:s=>s.all.filter(t=>s.productId===null?!0:t.productId===s.productId)},mutations:{SET_ALL(s,t){s.all=t},SET_PRODUCT_ID(s,t){s.productId=t}},actions:{getAll({commit:s}){return w.getAllSKU().then(({result:t})=>{const a=[];return console.debug(t),t.forEach(({_id:i,productId:o,name:n,desc:r,image:c,isShopee:u,isLazada:A})=>{a.push(new U(i,o,n,r,c,u,A))}),console.debug(a),s("SET_ALL",a),Promise.resolve("200")}).catch(t=>(console.error(t),Promise.resolve("200")))},filterById({commit:s},t){s("SET_PRODUCT_ID",t)}}};const q=P({actions:{},modules:{Products:F,SKU:W}});var Y="/e-commerce-hub-web/assets/doge.1f858bf3.svg";const J={data(){return{isMenuHidden:!0}},methods:{toggleMenu(){this.isMenuHidden=!this.isMenuHidden,this.isMenuHidden||window.scrollTo(0,0),console.debug(this.isMenuHidden)}}},G={class:"navbar sticky-top navbar-white bg-white shadow-sm"},Q={class:"container-fluid"},X=e("a",{class:"navbar-brand col-lg-3",href:"#"},[d("E-Commerce "),e("span",{class:"badge bg-primary"},"hub")],-1),Z={class:"d-flex d-lg-none"},ee={key:0,class:"bi-chevron-bar-expand"},te={key:1,class:"bi-chevron-bar-contract"},se={class:"container-md"},oe={class:"row g-0"},ne={class:"col-lg-3 col-xxl-2"},re={class:"nav nav-pills flex-column"},ae={class:"nav-item"},ie=e("i",{class:"bi-basket"},null,-1),ce=d(" Products"),le={class:"nav-item"},de=e("i",{class:"bi-inboxes"},null,-1),ue=d(" SKU"),me=e("li",{class:"nav-item"},[e("a",{class:"nav-link text-nowrap disabled"},[e("i",{class:"bi-boxes"}),d(" Inventory")])],-1),pe={class:"nav-item"},he=e("i",{class:"bi-table"},null,-1),_e=d(" Stock"),ge=e("li",{class:"nav-item"},[e("a",{class:"nav-link text-nowrap disabled"},[e("i",{class:"bi-cart4"}),d(" Orders")])],-1),fe=e("li",{class:"nav-item"},[e("a",{class:"nav-link text-nowrap disabled"},[e("i",{class:"bi-people"}),d(" Customers")])],-1),ve=e("li",{class:"nav-item"},[e("a",{class:"nav-link text-nowrap disabled"},[e("i",{class:"bi-chat-left-quote"}),d(" Notifications")])],-1),we=e("li",{class:"border-top my-3"},null,-1),be=e("li",{class:"nav-item dropdown"},[e("a",{class:"nav-link dropdown-toggle","data-bs-toggle":"dropdown",role:"button","aria-expanded":"false"},[e("img",{src:Y,alt:"",width:"32",height:"32",class:"rounded-circle me-2 bg-warning"}),e("strong",null,"Musk Shop")]),e("ul",{class:"dropdown-menu w-100"},[e("li",null,[e("a",{class:"dropdown-item",href:"#"},"Action")]),e("li",null,[e("a",{class:"dropdown-item",href:"#"},"Another action")]),e("li",null,[e("a",{class:"dropdown-item",href:"#"},"Something else here")]),e("li",null,[e("hr",{class:"dropdown-divider"})]),e("li",null,[e("a",{class:"dropdown-item",href:"#"},"Logout")])])],-1),ke={class:"col-lg-6 col-xl-6"};function Le(s,t,a,i,o,n){const r=g("router-link"),c=g("router-view");return m(),p(k,null,[e("nav",G,[e("div",Q,[X,e("div",Z,[e("button",{class:"btn",onClick:t[0]||(t[0]=(...u)=>n.toggleMenu&&n.toggleMenu(...u))},[o.isMenuHidden?(m(),p("i",ee)):(m(),p("i",te))])])])]),e("div",se,[e("div",oe,[e("div",ne,[e("div",{class:I(["pt-3 px-4 d-lg-block",{"d-none":o.isMenuHidden}])},[e("ul",re,[e("li",ae,[h(r,{to:{name:"products"},class:"nav-link text-nowrap"},{default:f(()=>[ie,ce]),_:1})]),e("li",le,[h(r,{to:{name:"sku"},class:"nav-link text-nowrap"},{default:f(()=>[de,ue]),_:1})]),me,e("li",pe,[h(r,{to:{name:"stock"},class:"nav-link text-nowrap"},{default:f(()=>[he,_e]),_:1})]),ge,fe,ve,we,be])],2)]),e("div",ke,[h(c)])])])],64)}var Se=L(J,[["render",Le]]);const ye=[{path:"/",name:"home",component:()=>l(()=>import("./Home.00e6955e.js"),["assets/Home.00e6955e.js","assets/vendor.195f37e3.js"])},{path:"/login",name:"login",component:()=>l(()=>import("./Login.161df10d.js"),["assets/Login.161df10d.js","assets/vendor.195f37e3.js"])},{path:"/:pathMatch(.*)*",name:"not-found",component:()=>l(()=>import("./NotFound.d8d9f0f3.js"),["assets/NotFound.d8d9f0f3.js","assets/vendor.195f37e3.js"])},{path:"/console",name:"console",redirect:{name:"products"},component:Se,children:[{path:"product",name:"products",component:()=>l(()=>import("./Products.5cada6e1.js"),["assets/Products.5cada6e1.js","assets/vendor.195f37e3.js"]),children:[{path:":id",name:"product-item",component:()=>l(()=>import("./ProductItem.a156e4e9.js"),["assets/ProductItem.a156e4e9.js","assets/bootstrap.esm.25e60e88.js","assets/vendor.195f37e3.js"]),props:!0}]},{path:"sku",name:"sku",component:()=>l(()=>import("./SKU.3b863cea.js"),["assets/SKU.3b863cea.js","assets/vendor.195f37e3.js","assets/bootstrap.esm.25e60e88.js"]),children:[{path:":id",name:"sku-item",component:()=>l(()=>import("./SKUItem.ca662404.js"),["assets/SKUItem.ca662404.js","assets/bootstrap.esm.25e60e88.js","assets/vendor.195f37e3.js"])}]},{path:"stock",name:"stock",component:()=>l(()=>import("./Stock.2713b854.js"),["assets/Stock.2713b854.js","assets/vendor.195f37e3.js"]),children:[{path:":id",name:"stock-item",component:()=>l(()=>import("./StockItem.1fcff272.js"),["assets/StockItem.1fcff272.js","assets/bootstrap.esm.25e60e88.js","assets/vendor.195f37e3.js"])}]}]}],y=x({history:T("/e-commerce-hub-web/"),linkActiveClass:"active",routes:ye});y.isReady().then(()=>{console.debug("app is ready")}).catch(console.error);const b=O(V);b.use(y);b.use(q);b.mount("body");export{L as _};