export default function decorate(block) {
  const link = block.querySelector('div a')?.getAttribute('href') || '';
  const img = block.querySelector('picture img');
  const src = img?.getAttribute('src') || '';
  const altText = img?.getAttribute('alt')?.trim() || 'logo';

  const htmlLiteral = `
    <span class="logo">  
      <a class="logo-picture" href="${link}">
        <img src="${src}" alt="${altText}">
      </a>
    </span>
  `;
  block.innerHTML = htmlLiteral;
}
