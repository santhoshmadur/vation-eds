export default function decorate(block) {
  const link = block.querySelector('div a')?.getAttribute('href');
  const img = block.querySelector('picture img');
  const src = img?.getAttribute('src') || '';
  const altText = img?.getAttribute('alt')?.trim() || 'logo';

  let htmlLiteral = '';
  if (link && link.trim() !== '') {
    htmlLiteral = `
      <span class="logo">  
        <a class="logo-picture" href="${link}">
          <img src="${src}" alt="${altText}">
        </a>
      </span>
    `;
  } else {
    htmlLiteral = `
      <span class="logo">
      <div class="logo-picture">
        <img src="${src}" alt="${altText}">
        </div>
      </span>
    `;
  }
  block.innerHTML = htmlLiteral;
}
