export default function decorate(block) {
  const children = [...block.children];

  // Wrap first two divs in a .title div
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'experiences-title';
  titleWrapper.appendChild(children[0]);
  titleWrapper.appendChild(children[1]);
  block.appendChild(titleWrapper);

  // Wrap next five divs in a .cards div
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'experiences-cards';
  for (let i = 2; i < 7; i += 1) {
    cardsWrapper.appendChild(children[i]);
  }
  block.appendChild(cardsWrapper);
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
  block.appendChild(navWrapper);
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'experiences-button';
  buttonWrapper.appendChild(children[7]);
  block.appendChild(buttonWrapper);
}
