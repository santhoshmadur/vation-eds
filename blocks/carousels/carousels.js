export default async function decorate(block) {
  const slides = Array.from(block.children);
  let currentIndex = 0;
  let autoSlideInterval;

  // Wrap all slides in a slider container
  const slider = document.createElement('div');
  slider.className = 'carousel-slider';

  slides.forEach((slide) => {
    slide.classList.add('carousel-slide');
    slider.appendChild(slide);
  });

  // Clear and rebuild block
  block.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';
  wrapper.appendChild(slider);
  block.appendChild(wrapper);

  // Create navigation buttons
  const nav = document.createElement('div');
  nav.className = 'carousel-nav';
  nav.innerHTML = `
    <button class="carousel-btn prev">&#10094;</button>
    <button class="carousel-btn next">&#10095;</button>
  `;
  block.appendChild(nav);

  // Ensure correct width of slider based on number of slides
  const updateSliderWidth = () => {
    slider.style.width = `${slides.length * 100}vw`;
    slides.forEach((slide) => {
      slide.style.width = '100vw';
    });
  };

  const updateCarousel = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };

  // Events
  block.querySelector('.next').addEventListener('click', showNext);
  block.querySelector('.prev').addEventListener('click', showPrev);

  // Auto Slide with hover pause
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(showNext, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  block.addEventListener('mouseenter', stopAutoSlide);
  block.addEventListener('mouseleave', startAutoSlide);

  // Init
  updateSliderWidth();
  updateCarousel();
  startAutoSlide();
}
