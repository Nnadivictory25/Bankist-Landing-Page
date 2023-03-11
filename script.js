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

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header)


// ! REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => { 
  const [entry] = entries;
  // console.log(entry)

  if (!entry.isIntersecting) return;
    
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// ! LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  
  if (!entry.isIntersecting) return;
  
  // REPLACE THE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => { 
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTargets.forEach(img => imgObserver.observe(img))

///////////////////////////////////
// ! SLIDER
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  let maxSlide = slides.length;

  // 0%, 100%, 200%, 300%
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    })
  }


  const activateDots = (slide) => {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  const goToSlide = (slide) => {
    slides.forEach((el, i) => {
      el.style.transform = `translateX(${(i - slide) * 100}%)`;
    })
  }


  const init = () => {
    goToSlide(0)
    createDots()
    activateDots(curSlide)
  }
  init()

  // NEXT SLIDE
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++
    }

    goToSlide(curSlide)
    activateDots(curSlide)
  }

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide)
    activateDots(curSlide)
  }

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  })

  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset
      goToSlide(slide)
      activateDots(slide)
    }
  })
}
slider()