export default async function decorate(block) {
  // Create a wrapper container
  const section = document.createElement('div');
  section.className = 'solutions-section';

  // Title (from the first <div>)
  const titleDiv = block.children[0];
  if (titleDiv) {
    const titleText = titleDiv.querySelector('p')?.textContent.trim();
    if (titleText) {
      const heading = document.createElement('h1');
      heading.textContent = titleText;
      section.appendChild(heading);
    }
  }

  // Grid container
  const cardGrid = document.createElement('div');
  cardGrid.className = 'card-grid';

  // All middle children are cards (excluding first and last)
  const cards = [...block.children].slice(1, -1);

  cards.forEach((cardDiv) => {
    const link = cardDiv.querySelector('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const title = cardDiv.querySelectorAll('p')[0]?.textContent.trim();
    const desc = cardDiv.querySelectorAll('p')[1]?.textContent.trim();
    const picture = cardDiv.querySelector('picture');

    const card = document.createElement('div');
    card.className = 'card';

    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.title = link.getAttribute('title') || title || '';

    // Icon/Image
    const icon = document.createElement('div');
    icon.className = 'icon';
    if (picture) {
      icon.appendChild(picture.cloneNode(true));
    }

    // Title
    const h2 = document.createElement('h2');
    h2.textContent = title || '';

    // Description
    const p = document.createElement('p');
    p.textContent = desc || '';

    // Build card
    anchor.appendChild(icon);
    anchor.appendChild(h2);
    anchor.appendChild(p);
    card.appendChild(anchor);
    cardGrid.appendChild(card);
  });

  section.appendChild(cardGrid);

  // CTA (last child)
  const ctaSource = block.lastElementChild?.querySelector('a');
  if (ctaSource) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'cta';
    const cta = document.createElement('a');
    cta.href = ctaSource.href;
    cta.title = ctaSource.title || ctaSource.textContent.trim();
    cta.textContent = ctaSource.textContent.trim();
    ctaDiv.appendChild(cta);
    section.appendChild(ctaDiv);
  }

  // Clear original and insert new DOM
  block.innerHTML = '';
  block.appendChild(section);
}
