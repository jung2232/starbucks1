//------------------돋보기 버튼 제어---------------------
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});

//포커스가 들어가면 .focused 추가
searchInputEl.addEventListener("focus", function () {
    searchEl.classList.add("focused");
    searchInputEl.setAttribute("placeholder", "통합검색");
});

//포커스가 나가면 .focused 삭제
searchInputEl.addEventListener("blur", function () {
    searchEl.classList.remove("focused");
    searchInputEl.setAttribute("placeholder", "");
});


//------------------뱃지 제어---------------------
const bebgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector("#to-top");
/*
document => html 자체로 해석
window => 브라우저 창으로 해석
*/
/*
lodash설치 후
_.throttle(함수, 시간)
*/
window.addEventListener('scroll',
    _.throttle(function(){
        if(window.scrollY > 500){
            //bebgeEl.style.display = 'none';
            //gsop문법 => gsap.to(요소, 지속시간초단위, 옵션)
            gsap.to(bebgeEl,0.6,{
                opacity : 0,
                display : 'none'
            });
            // 상단으로 스크롤 버튼 보이기!
            gsap.to(toTopEl, 0.2, {
                x: 0,
      });
        }else{
            //bebgeEl.style.display = 'block';
            gsap.to(bebgeEl,0.6,{
                opacity : 1,
                display : 'block'
            });
            // 상단으로 스크롤 버튼 숨기기!
            gsap.to(toTopEl, 0.2, {
                x: 100,
      });

        }
    },300)
); /*-------------------------- */

// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
    gsap.to(window, .7, {
      scrollTo: 0
    });
});

//------------------main visual 순차적 등장---------------------
const fadeEl = document.querySelectorAll('.visual .fade-in');
fadeEl.forEach(function(fadeEl, index){
    //gsop문법 => gsap.to(요소, 지속시간초단위, 옵션)
    gsap.to(fadeEl, 1, {
        delay : (index + 1) * 0.7, //0.7, 1.4, 2.1, 2.8
        opacity : 1,
    })
});


//------------------공지사항 swiper slider---------------------
new Swiper('.notice-line .swiper', {
    direction: 'vertical',
    loop: true,
    autoplay : true
});

  //------------------promoiton swiper slider---------------------
new Swiper('.promotion .swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay : {
        delay : 5000
    },
    pagination :{
        el : ".promotion .swiper-pagination",
        clickable : true
    },
    navigation : {
        prevEl : ".promotion .swiper-prev",
        nextEl : ".promotion .swiper-next"
    },
    slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true //1번 슬라이드가 가운데 보이기
});

    //promoiton toggle-btn--------
const promotionEl = document.querySelector('.promotion'); //슬라이드 영역 요소 검색
const promotionToggleBtn = document.querySelector('.toggle-promotion'); //슬라이드영역을 토글할 버튼 검색

//슬라이드 영역 숨김 여부에 관한 기본값 설정
let isHidePromotion = false;

//토글버튼을 클릭하면 
promotionToggleBtn.addEventListener('click', function(){
    //슬라이드 영역 숨기 여부를 반대값
    isHidePromotion = !isHidePromotion;

    if(isHidePromotion){
        promotionEl.classList.add('hide');
    } else {
        promotionEl.classList.remove('hide');
    }
});

//플로팅 이미지--------
function random(min, max){
    //toFixed
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject (selector, delay, size){
    //gsop문법 => gsap.to(요소, 지속시간초단위, 옵션)
    gsap.to(selector, random(1.5,2.5),{
        y : size,
        repeat : -1, //몇 번 반복할지 설정, -1 무한반복
        yoyo : true, //한 번 재생된 애니메이션을 다시 뒤로 재생
        ease : Power1.easeOut,
        delay : random(0, delay),
    })
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 15);


//AWARDS----
new Swiper('.awards .swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay : true,
    slidesPerView: 5, //한 번에 보여지는 슬라이드 개수
    spaceBetween: 30,
    navigation : {
        prevEl : ".awards .swiper-prev",
        nextEl : ".awards .swiper-next"
    },
});

//올해 년도 구하기--------
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

//Masgic Scroll------------------------
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
    new ScrollMagic.Scene({
       triggerElement: spyEl,
        triggerHook: 0.8,
     })   
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});
