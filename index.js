import{a as S,S as w,i as a}from"./assets/vendor-CRsTpldL.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const q="https://pixabay.com/api/",E="51454190-e114164169ef9dafb1528e77f";async function f(r,o){const i={key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};try{return(await S.get(q,{params:i})).data}catch(n){console.error("Error fetching images:",n)}}const m=document.querySelector(".gallery"),P=new w(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function y(r){function o({webformatURL:n,largeImageURL:e,tags:t,likes:s,views:b,comments:L,downloads:v}){return`<li class="gallery-item">
        <a class="gallery-link" href="${e}">
          <img class="gallery-image" src="${n}" alt="${t}" />
        </a>
        <div class="image-describe">
        <div class="img-info">
          <b>Likes</b>
          <p>${s}</p>
        </div>
        <div class="img-info">
          <b>Views</b>
          <p>${b}</p>
        </div>
        <div class="img-info">
          <b>Comments</b>
          <p>${L}</p>
        </div>
        <div class="img-info">
          <b>Downloads</b>
          <p>${v}</p>
        </div>
        </div>
      </li>
    `}const i=r.map(o).join("");m.insertAdjacentHTML("beforeend",i),P.refresh()}function M(){m.innerHTML=""}function p(){document.querySelector(".loader").classList.remove("is-hidden")}function g(){document.querySelector(".loader").classList.add("is-hidden")}function B(){document.querySelector(".load-more").classList.remove("is-hidden")}function h(){document.querySelector(".load-more").classList.add("is-hidden")}console.log("mygallery",m);const d=document.querySelector(".form"),R=document.querySelector('input[name="search-text"]');let u=0,l=1,c="";const $=document.querySelector(".load-more");d.addEventListener("submit",O);async function O(r){r.preventDefault(),c=R.value.trim();let o=1;if(c===""){d.reset(),a.warning({title:"Error",message:"Search field cannot be empty!",position:"topRight"});return}M(),p(),h();try{const i=await f(c,o);if(u=i.totalHits,i.hits.length===0){a.info({timeout:7e3,displayMode:"once",title:"Try another one",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(i.hits),u>15&&B(),d.reset()}catch{a.error({title:"Error",message:"There is some error, please try another time",position:"topRight"})}finally{g()}}$.addEventListener("click",T);async function T(){try{l+=1,p();const r=await f(c,l);y(r.hits),x(),l*15>=u&&(h(),a.info({title:"Notice",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:"Error",message:"There is some error, please try another time",position:"topRight"})}finally{g()}}function x(){const r=document.querySelector(".gallery-item");if(!r)return;const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
