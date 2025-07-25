const isInUniversalEditor = window.location.pathname.includes('/content');

export default function decorate(block) {
  const parentClass = block.parentElement?.parentElement?.className;

  if (isInUniversalEditor) return;

  if (parentClass) {
    const section = document.createElement('div');
    section.className = 'solutions-section';

    const titleDiv = block.children[0];
    if (titleDiv) {
      const paragraphs = titleDiv.querySelectorAll('p');
      const titleCard = document.createElement('div');
      titleCard.className = 'title-card';

      if (paragraphs.length > 0) {
        const h1 = document.createElement('h1');
        h1.textContent = paragraphs[0].textContent.trim();
        titleCard.appendChild(h1);
      }
      if (paragraphs.length > 1) {
        const p = document.createElement('p');
        p.innerHTML = paragraphs[1].innerHTML; // preserves formatting like &nbsp;
        titleCard.appendChild(p);
      }
      section.appendChild(titleCard);
    }

    const cardGrid = document.createElement('div');
    cardGrid.className = 'card-grid';

    let cards = [];
    if (parentClass.includes('card-black-background')) {
      cards = [...block.children].slice(1, -1);
    } else {
      cards = [...block.children].slice(1);
    }

    cards.forEach((cardDiv) => {
      const link = cardDiv.querySelector('a');
      const href = link?.getAttribute('href') || null;
      const title = cardDiv.querySelectorAll('p')[0]?.textContent.trim() || '';
      const desc = cardDiv.querySelectorAll('p')[1]?.textContent.trim() || '';
      const picture = cardDiv.querySelector('picture');

      const card = document.createElement('div');
      card.className = 'card';

      const anchor = href ? document.createElement('a') : document.createElement('div');
      if (href) {
        anchor.href = href;
        anchor.title = link.getAttribute('title') || title;
      }

      const icon = document.createElement('div');
      icon.className = 'icon';
      if (picture) icon.appendChild(picture.cloneNode(true));

      const h2 = document.createElement('h2');
      h2.textContent = title;

      const p = document.createElement('p');
      p.textContent = desc;

      anchor.appendChild(icon);
      anchor.appendChild(h2);
      anchor.appendChild(p);
      card.appendChild(anchor);
      cardGrid.appendChild(card);
    });

    section.appendChild(cardGrid);

    if (parentClass.includes('card-black-background')) {
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
    }

    block.innerHTML = '';
    block.appendChild(section);
  }
}
