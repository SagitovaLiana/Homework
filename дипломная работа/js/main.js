
//================================button-like==================================== 
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация избранного
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  // Обработчик клика по кнопке "лайк"
  document.addEventListener('click', function(e) {
    if (e.target.closest('.button-like')) {
      e.preventDefault();
      const button = e.target.closest('.button-like');
      const productCard = button.closest('.product-card');
      
      // Получаем HTML всего товара
      const productHtml = productCard.outerHTML;
      const productId = productCard.id;
      
      // Получаем текущее избранное
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      
      // Проверяем, есть ли уже товар в избранном
      const existingIndex = favorites.findIndex(item => item.id === productId);
      
      if (existingIndex === -1) {
        // Добавляем в избранное
        favorites.push({
          id: productId,
          html: productHtml
        });
        button.classList.add('button-like__active');
      } else {
        // Удаляем из избранного
        favorites.splice(existingIndex, 1);
        button.classList.remove('button-like__active');
      }
      
      // Сохраняем изменения
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Обновляем счетчик
      updateFavoritesCounter();
    }
  });
  
  // Функция обновления счетчика
  function updateFavoritesCounter() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const counter = document.querySelector('.favorites-counter');
    
    if (counter) {
      counter.textContent = favorites.length;
      counter.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
    
    // Восстанавливаем состояние кнопок
    document.querySelectorAll('.button-like').forEach(button => {
      const productId = button.closest('.product-card').id;
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isFavorite = favorites.some(item => item.id === productId);
      
      button.classList.toggle('button-like__active', isFavorite);
    });
  }
  
  // Инициализация при загрузке
  updateFavoritesCounter();
});

//================================gallery==================================== 
new Swiper('.gallery__slider',{
  slidesPerView: 1,
  direction:'vertical',
  thumbs: {
    swiper: {
      el: '.gallery__slider-mini',
      slidesPerView: 5,
      direction:'vertical',
      spaceBetween:19,
    }
  },
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev',
  },
  
});
//================================button-control==================================== 
// Функция для обновления состояния кнопок
function updateButtonsState(input) {
  const currentValue = parseInt(input.value);
  const maxCount = parseInt(input.dataset.maxCount);
  const minValue = 1; 
  
  const minusBtn = input.parentElement.querySelector('.bt_minus');
  const plusBtn = input.parentElement.querySelector('.bt_plus');
  
  // Обновляем состояние кнопки минус
  if (currentValue <= minValue) {
      minusBtn.classList.add('bt_disabled');
  } else {
      minusBtn.classList.remove('bt_disabled');
  }
  
  // Обновляем состояние кнопки плюс
  if (currentValue >= maxCount) {
      plusBtn.classList.add('bt_disabled');
  } else {
      plusBtn.classList.remove('bt_disabled');
  }
}

// Убавляем кол-во по клику
document.querySelectorAll('.quantity_inner .bt_minus').forEach(function (element) {
  element.addEventListener('click', function(event) {
      event.preventDefault();
      let input = this.parentElement.querySelector('.quantity');
      let count = parseInt(input.value) - 1;
      count = count < 1 ? 1 : count;
      input.value = count;
      updateButtonsState(input);
  });
});

// Прибавляем кол-во по клику
document.querySelectorAll('.quantity_inner .bt_plus').forEach(function (element) {
  element.addEventListener('click', function(event) {
      event.preventDefault();
      let input = this.parentElement.querySelector('.quantity');
      let count = parseInt(input.value) + 1;
      count = count > parseInt(input.dataset.maxCount) ? parseInt(input.dataset.maxCount) : count;
      input.value = count;
      updateButtonsState(input);
  });
});

// Убираем все лишнее и невозможное при изменении поля
document.querySelectorAll('.quantity_inner .quantity').forEach(function (element) {
  element.addEventListener("change", function(event) {
      event.preventDefault();
      if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9]/g, '');
      }
      if (this.value == "") {
          this.value = 1;
      }
      if (this.value > parseInt(this.dataset.maxCount)) {
          this.value = parseInt(this.dataset.maxCount);
      }
      updateButtonsState(this);
  });
});

// Инициализация состояния кнопок при загрузке страницы
document.querySelectorAll('.quantity_inner .quantity').forEach(function (element) {
  updateButtonsState(element);
});
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
    // Если на ссылк есть tab-controls__link--active, то удали его
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
