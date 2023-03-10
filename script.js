'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document. querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


btnScrollTo.addEventListener('click', () => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)

  console.log('Current scroll position: ', window.pageXOffset, window.pageYOffset)
  
  // scrolling

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' });
})

// PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(link => { 
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     const id = link.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })

// WITH EVENT DELEGATION
// . Add  event listener to common parent element
// . Determine what eleemnt originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) { 
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

////////////////////////////////////////////////////////
// ! TABBED COMPONENTS
const tabsBtns = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) { 
  const clickedBtn = e.target.closest('.operations__tab');

  if (!clickedBtn) return;
  
  tabsBtns.forEach(btn => btn.classList.remove('operations__tab--active'))
  tabsContent.forEach(content => content.classList.remove('operations__content--active'))
  clickedBtn.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clickedBtn.dataset.tab}`).classList.add('operations__content--active');
})

/////////////////////////////////////////////////////////
// ! MENU FADE ANIMATION
const nav = document.querySelector('.nav');

const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) { 
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(sibling => {
      if (sibling !== link) { 
        sibling.style.opacity = opacity
      }
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', (e) => {
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', (e) => {
  handleHover(e, 1)
})

//////////////////////////////////////////////////
// ! STICKY NAVIGATION
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)
// window.addEventListener('scroll', (e) => { 
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })
// USING INTERSECTION OBSERVER
const obsCallback = (entries, observer) => { 
  entries.forEach(entry => {
    console.log(entry)
  })
}

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
}

const observer = new IntersectionObserver(obsCallback, obsOptions)
observer.observe(section1)