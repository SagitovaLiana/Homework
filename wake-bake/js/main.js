(function(){
// Запустила функцию

//===============================Burger=====================================
document.addEventListener('click', burgerInit)
// Накладываю слушатель событий, по клику запустить функию
function burgerInit(e){
// Сама функция
  const burgerIcon= e.target.closest('.burger-icon')
// Присваиваю переменной burgerIcon значение класса
  const burgerNavLink= e.target.closest('.nav__link')
  // Присваиваю переменной burgerNavLink значение класса
if (!burgerIcon && !burgerNavLink) return
// не burgerIcon и не burgerNavLink, тогда верни
if (document.documentElement.clientWidth>900) return

if (!document.body.classList.contains('body--opened-menu')){

  document.body.classList.add('body--opened-menu')
} else {
  document.body.classList.remove('body--opened-menu')
}
}


//================================Modal==================================== 
const modal = document.querySelector('.modal')
const modalButton = document.querySelector('.about__img-button')

modalButton.addEventListener('click', openModal)
modal.addEventListener('click', closeModal)

function openModal(e) {
  e.preventDefault()
  document.body.classList.toggle('body--opened-modal')
}
function closeModal(e) {
  e.preventDefault()
  const target = e.target
  if(target.closest('.modal__cancel')|| target.classList.contains('modal')){
    document.body.classList.remove('body--opened-modal')
  }
}
//================================Tab==================================== 
const tabControls = document.querySelector('.tab-controls')
// Присваиваю переменной tab-controls которые он найдет на сайте
// Я говорю давай работать со всеми кнопками
tabControls.addEventListener('click', toggleTab)
// Навешиваю этой переменной слушатель по клику с фунцией
// То есть все клики на нем с ними что-то нужно сделать 
function toggleTab(e) {
  // Запуск функции с описанием события
  const tabControl = e.target.closest('.tab-controls__link')
  // Я проверяю, есть ли у этого события родитель с кассом tab-controls__link
  // Нажала ли я вообще на кнопку? Если да, то присвоить переменной этот класс

  if (!tabControl) return
  // Если нет, ниче не делай
  e.preventDefault()
  // Если мы все таки на ссылке, то отмени дефолтное поведение
  if(tabControl.classList.contains('tab-controls__link--active'))return
// Если на элементе есть класс tab-controls__link--active, то ничего не делай
// То есть если ссылка уже открыта, ничего не делай 
  const tabContentID = tabControl.getAttribute('href')
  const tabContent = document.querySelector(tabContentID)
  const activeControl = document.querySelector('.tab-controls__link--active')
  const activeContent = document.querySelector('.tab-content--show')

  if(activeControl){
    activeControl.classList.remove('tab-controls__link--active')
    // Если на ссылк еесть tab-controls__link--active, то удали его
  }
if (activeContent){
  activeContent.classList.remove('tab-content--show')
  // Если на ссылк еесть tab-content--show, то удали его
}
  tabControl.classList.add('tab-controls__link--active')
  // Если на ссылке, которую мы нажали нет tab-controls__link--active, то добавь его
  tabContent.classList.add('tab-content--show')
}
//================================Accordion==================================== 
// Аккордеон

const accordionLists = document.querySelectorAll('.accordion-list');

accordionLists.forEach(el => {

    el.addEventListener('click', (e) => {

        const accordionList = e.currentTarget
        const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
        const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

        const accordionControl = e.target.closest('.accordion-list__control');
        if (!accordionControl) return
        e.preventDefault()
        const accordionItem = accordionControl.parentElement;
        const accordionContent = accordionControl.nextElementSibling;

        if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
            accordionOpenedItem.classList.remove('accordion-list__item--opened');
            accordionOpenedContent.style.maxHeight = null;
        }
        accordionItem.classList.toggle('accordion-list__item--opened');

        if (accordionItem.classList.contains('accordion-list__item--opened')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = null;
        }

    });

});
//================================Gallery==================================== 
const swiper = new Swiper('.gallery__slider', {
  spaceBetween: 15,
  slidesPerView: 1.5,

  pagination: {
    el: '.gallery__pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev',
  },

  breakpoints: {
    321: {
      slidesPerView: 2,
    },
    601: {
      slidesPerView: 3,
    },
    801: {
      spaceBetween: 32,
    },
    1101: {
      slidesPerView: 4,
    }
  }
});
//================================Testimonials==================================== 
new Swiper('.testimonials__slider', {
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: true,

  navigation: {
    nextEl: '.testimonials__next',
    prevEl: '.testimonials__prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  breakpoints: {
    901: {
      slidesPerView: 1.5,
    },
    1201: {
      slidesPerView: 2.1,
    }
  }
});
//================================Maskforphone==================================== 
    const telInputs = document.querySelectorAll('input[type="tel"]')
    const im = new Inputmask('+7 (999) 999-99-99')
    im.mask(telInputs)
})()

