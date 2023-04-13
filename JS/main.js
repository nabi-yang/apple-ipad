import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

//장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click',event => {
  event.stopPropagation()
  if(basketEl.classList.contains('show')){
    hideBasket()
  }else{
    showBasket()
  }
})
basketEl.addEventListener('click',event => {
  event.stopPropagation()
  
});

window.addEventListener('click', ()=>{
  hideBasket()
});

function showBasket(){
  basketEl.classList.add('show')
};
function hideBasket(){
  basketEl.classList.remove('show')
};

//검색

const headerEl = document.querySelector('header');
const headerMenuEls = [...document.querySelectorAll('ul.menu > li')]
const searchWrapEl=headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl=searchWrapEl.querySelector('.search-closer');
const searchShadowEl=searchWrapEl.querySelector('.shadow');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]
const searchInputEl = searchWrapEl.querySelector('input')

searchStarterEl.addEventListener('click',showSearch)
searchCloserEl.addEventListener('click',hideSearch)
searchShadowEl.addEventListener('click',hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' 
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's' 
  })
  setTimeout(function(){
    searchInputEl.focus()
  }, 600) //0.6초
}
function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' 
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's' 
  })
  searchDelayEls.reverse()
  searchInputEl.value='' //검색창 초기화 
}


//보이는지
const io= new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
});

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생

const video = document.querySelector('.stage video')
const playBtn= document.querySelector('.stage .controller--play')
const pauseBtn= document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click',function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
});

pauseBtn.addEventListener('click',function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
});


// compare
const itemsEl=document.querySelector('section.compare .items')
ipads.forEach(function (ipad){
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList =''
  ipad.colors.forEach(function (color){
    colorList+=`<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML =/*html*/`
  <div class="thumbnail"> 
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
  ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `
  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

// 년도
const thisYearEl=document.querySelector('span.this-year')
thisYearEl.textContent =new Date().getFullYear()