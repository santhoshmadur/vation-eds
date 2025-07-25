export default async function decorate(block) {
  block.classList.add('solution-cards');

  const children = [...block.children];
  const title = children.shift(); // First <div> is the title
  title.classList.add('solution-title');

  const last = children[children.length - 1];
  const isCTA = last.textContent.includes('Discover How Vation');

  children.forEach((card, index) => {
    if (isCTA && index === children.length - 1) {
      card.classList.add('solution-cta');
      const link = card.querySelector('a');
      link.classList.add('cta-button');
      return;
    }

    card.classList.add('solution-card');
    const [iconDiv, contentDiv, linkDiv] = card.children;

    if (iconDiv?.querySelector('img')) iconDiv.classList.add('solution-icon');
    if (contentDiv?.querySelectorAll('p').length >= 2) {
      contentDiv.classList.add('solution-content');
      const [heading, description] = contentDiv.querySelectorAll('p');
      heading.classList.add('solution-heading');
      description.classList.add('solution-description');
    }

    if (linkDiv?.querySelector('a')) {
      const link = linkDiv.querySelector('a');
      link.classList.add('solution-link');
      link.textContent = 'Learn More →';
    }
  });
}
