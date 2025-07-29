export default function decorate(block) {
  const children = [...block.children];

  // Wrap title section
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'experiences-title';
  titleWrapper.appendChild(children[0]);
  titleWrapper.appendChild(children[1]);
  block.appendChild(titleWrapper);

  // Outer carousel container (for masking scroll)
  const outerWrapper = document.createElement('div');
  outerWrapper.className = 'experiences-carousel';

  // Cards wrapper
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'experiences-cards';
  for (let i = 2; i < 7; i += 1) {
    cardsWrapper.appendChild(children[i]);
  }

  // Clone first 3 cards for infinite looping
  const originalCards = [...cardsWrapper.children];
  for (let i = 0; i < 3; i += 1) {
    const clone = originalCards[i].cloneNode(true);
    cardsWrapper.appendChild(clone);
  }

  outerWrapper.appendChild(cardsWrapper);
  block.appendChild(outerWrapper);

  // Navigation buttons
  const navWrapper = document.createElement('div');
  navWrapper.className = 'experiences-nav';

  const prevButton = document.createElement('button');
  prevButton.className = 'experiences-btn prev';
  prevButton.textContent = '❮';

  const nextButton = document.createElement('button');
  nextButton.className = 'experiences-btn next';
  nextButton.textContent = '❯';

  navWrapper.appendChild(prevButton);
  navWrapper.appendChild(nextButton);
  outerWrapper.appendChild(navWrapper);

  // CTA button
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'experiences-button';
  buttonWrapper.appendChild(children[7]);
  block.appendChild(buttonWrapper);

  // --- Carousel logic ---
  const totalCards = originalCards.length;
  let currentIndex = 0;

  const updateCarousel = (index) => {
    cardsWrapper.style.transform = `translateX(-${index * 416}px)`; // 384px card + 32px gap
  };

  const showNext = () => {
    currentIndex += 1;
    updateCarousel(currentIndex);

    if (currentIndex === totalCards) {
      setTimeout(() => {
        cardsWrapper.style.transition = 'none';
        currentIndex = 0;
        updateCarousel(currentIndex);
        requestAnimationFrame(() => {
          cardsWrapper.style.transition = '';
        });
      }, 500);
    }
  };

  const showPrev = () => {
    if (currentIndex === 0) {
      cardsWrapper.style.transition = 'none';
      currentIndex = totalCards;
      updateCarousel(currentIndex);
      requestAnimationFrame(() => {
        cardsWrapper.style.transition = '';
        currentIndex -= 1;
        updateCarousel(currentIndex);
      });
    } else {
      currentIndex -= 1;
      updateCarousel(currentIndex);
    }
  };

  nextButton.addEventListener('click', showNext);
  prevButton.addEventListener('click', showPrev);

  setInterval(showNext, 5000);
}
