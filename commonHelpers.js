import{a as f,S as p,i as d}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const h="https://pixabay.com",v="/api/",b=f.create({baseURL:h,timeout:1e3});function L(r,s){const t=r.trim();return console.log({value:t}),t?b.get(v,{params:{key:"42279202-5e6657fc85e4b10c09189e202",image_type:"photo",orientation:"horizontal",safesearch:!0,q:t,page:s,per_page:15}}):Promise.reject()}const g=document.querySelector("#search-input"),c=document.querySelector("#gallery"),E=document.querySelector(".loader"),w=document.querySelector(".navigation"),S=document.querySelector("#more"),P=document.getElementById("message"),i={searchInput:g,gallery:c,loader:E,navigationForm:w,moreButton:S,msg:P},n={PAGE:1,SEARCH_WORD:""},R=new p("#gallery .gallery-item .gallery-link ",{dowload:!1,close:!0,closeText:"×",captions:!0,captionsData:"alt",captionType:"attr",captionDelay:250,captionSelector:"img"});async function y(r,s){n.SEARCH_WORD=r,m(),A();try{const{data:t}=await L(r,s);O(t.hits)&&r.length;const a=t.hits.map(e=>`<div class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
      <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
  </a>
  <div class="image-info">
      <div><b>Likes</b> ${e.likes}</div>
      <div><b>Views</b> ${e.views}</div>
      <div><b>Comments</b> ${e.comments}</div>
      <div><b>Downloads</b> ${e.downloads}</div>
  </div>
  </div>`).join("");l(),B(),!t.hits.length&&t.total&&(l(),m(),d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",title:"",color:"blue"})),s===1?c.innerHTML=a:(c.innerHTML+=a,window.scrollBy({behavior:"smooth",top:Math.ceil(c.firstElementChild.getBoundingClientRect().height)*6})),R.refresh()}catch{l(),d.show({message:'"Sorry, there are no images matching your search query. Please try again!"',position:"topRight",title:"",color:"red"})}l(),g.value=""}function A(){i.loader.style.display="inline-block"}function l(){i.loader.style.display="none"}function B(){i.moreButton.style.display="inline-block"}function m(){i.moreButton.style.display="none"}function O(r){r.length||(m(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",title:"",color:"red"}))}i.navigationForm.addEventListener("submit",r=>{r.preventDefault(),n.PAGE=1,y(i.searchInput.value,n.PAGE),n.PAGE+=1});i.moreButton.addEventListener("click",()=>{y(n.SEARCH_WORD,n.PAGE),n.PAGE+=1});
//# sourceMappingURL=commonHelpers.js.map
