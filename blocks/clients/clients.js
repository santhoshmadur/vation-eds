export default function decorate(block) {
  const children = Array.from(block.children);

  // --- Wrap the first div (title) ---
  const titleDiv = children[0];
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'client-title';
  titleWrapper.appendChild(titleDiv);
  block.appendChild(titleWrapper);

  // --- Wrap remaining divs (testimonials) ---
  const testimonialBlocks = children.slice(1);
  const flexWrapper = document.createElement('div');
  flexWrapper.className = 'client-main';

  testimonialBlocks.forEach((child) => {
    flexWrapper.appendChild(child);
  });

  block.appendChild(flexWrapper);
}
