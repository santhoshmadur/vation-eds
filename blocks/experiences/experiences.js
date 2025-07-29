export default function decorate(block) {
  const children = Array.from(block.children);
  const firstTwo = children.slice(0, 2);

  if (firstTwo.length > 0) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('title');

    firstTwo.forEach((child) => wrapper.appendChild(child));

    block.prepend(wrapper);
  }
}
