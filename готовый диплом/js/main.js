
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
  
  function updateFavoritesCounter() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const counter = document.querySelector('.favorites-counter');
    
    if (counter) {
      counter.textContent = favorites.length;
      counter.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
    
    document.querySelectorAll('.button-like').forEach(button => {
      const productId = button.closest('.product-card').id;
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isFavorite = favorites.some(item => item.id === productId);
      
      button.classList.toggle('button-like__active', isFavorite);
    });
  }
  updateFavoritesCounter();
});

//================================gallery==================================== 

new Swiper('.gallery__slider',{
  slidesPerView: 1,
  direction:'vertical',
  pagination:{
    el: '.swiper-pagination',
    clickable: true,
  },
  thumbs: {
    swiper: {
      el: '.gallery__slider-mini',
      slidesPerView: 5,
      direction:'vertical',
      spaceBetween:14,
    }
  },
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev',
  },
  breakpoints: {
    201: {
      direction:'horizontal',
    },
    751: {
      direction: 'vertical',
    }
  }
});
// =====================================text-hidden============================================
document.querySelector('.hero__text-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const textBlock = document.querySelector('.hero__text');
  const btn = this;
  // Переключаем классы
  textBlock.classList.toggle('expanded');
  btn.classList.toggle('expanded');
  
  // Меняем текст кнопки
  if (textBlock.classList.contains('expanded')) {
    btn.textContent = 'Скрыть описание';
  } else {
    btn.textContent = 'Показать описание';
  }
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


// ==================================scroll-tab-content=========================================
const tabControls = document.querySelector('.tab-controls');

tabControls.addEventListener('click', (e) => {
  const tabControl = e.target.closest('.tab-controls__link');
  if (!tabControl) return;
  
  e.preventDefault();

  if(tabControl.classList.contains('tab-controls__link--active')) return;
  
  const tabContentID = tabControl.getAttribute('href');
  const tabContent = document.querySelector(tabContentID);
  const activeControl = tabControls.querySelector('.tab-controls__link--active');
  const activeContent = document.querySelector('.tab-content--show');
  
  requestAnimationFrame(() => {
    activeControl?.classList.remove('tab-controls__link--active');
    activeContent?.classList.remove('tab-content--show');
    
    tabControl.classList.add('tab-controls__link--active');
    tabContent.classList.add('tab-content--show');
  });
});

const tabs = document.querySelector('.about__tab-controls');
const scrollStep = 200;

const scrollLeft = document.querySelector('.scroll-left');
const scrollRight = document.querySelector('.scroll-right');

if(scrollLeft && scrollRight) {
  scrollLeft.addEventListener('click', () => {
    tabs.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });
  
  scrollRight.addEventListener('click', () => {
    tabs.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });
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
// =====================================product-hidden===================================================================
document.querySelector('.main__button-more').addEventListener('click', function(e) {
  e.preventDefault();
  // Нашли кнопку, отменили поведение, навешали слушателя
  const productsList = document.querySelector('.main__products-list');
  const buttonIcon = document.querySelector('.button-more-icon');
  const buttonText = this.querySelector('.button-more-text');
  
  productsList.classList.toggle('btn-more-open');
  buttonIcon.classList.toggle('btn-more-open');
  
  if (productsList.classList.contains('btn-more-open')) {
    buttonText.textContent = 'Скрыть';
  } else {
    buttonText.textContent = 'Показать еще';
  }
});
    
    
// ===================================================================================