export default function decorate(block) {
  const allSections = [...block.children];
  const titleSection = allSections[0];
  const tabSections = allSections.slice(1);

  const tabTitles = [];
  const tabContentHTML = [];

  // Main Title
  const mainTitle = titleSection.querySelector('p')?.textContent?.trim() || '';

  // Build tab headers and contents
  tabSections.forEach((section, index) => {
    const [titleWrapper, contentWrapper, imageWrapper] = section.children;
    const title = titleWrapper?.querySelector('p')?.textContent?.trim() || `Tab ${index + 1}`;
    tabTitles.push(title);

    // Build tab content
    const contentHTML = contentWrapper?.innerHTML || '';
    const imageHTML = imageWrapper?.innerHTML || '';

    // Add <hr> between <p> tags except the last two
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHTML;
    const pTags = tempDiv.querySelectorAll('p');
    pTags.forEach((p, i) => {
      if (i < pTags.length - 2) {
        const hr = document.createElement('hr');
        p.after(hr);
      }
    });

    const processedContentHTML = tempDiv.innerHTML;

    const tabClass = index === 0 ? 'tab-content active' : 'tab-content';
    tabContentHTML.push(`
      <div class="${tabClass}">
        <div class="tab-text">${processedContentHTML}</div>
        <div class="tab-image">${imageHTML}</div>
      </div>
    `);
  });

  // Build tab header list
  const tabHeaderHTML = tabTitles
    .map((title, index) => {
      const activeClass = index === 0 ? 'active' : '';
      return `<li class="${activeClass}"><a>${title}</a></li>`;
    })
    .join('');

  // Final assembled HTML
  const htmlLiteral = `
    <div class="main-title">${mainTitle}</div>
    <ul class="tab-header">${tabHeaderHTML}</ul>
    <div class="tab-container-main">
      ${tabContentHTML.join('')}
    </div>
  `;

  block.innerHTML = htmlLiteral;

  // Add interactivity
  const tabListItems = block.querySelectorAll('.tab-header li');
  const tabContents = block.querySelectorAll('.tab-content');

  tabListItems.forEach((li, index) => {
    li.addEventListener('click', () => {
      tabListItems.forEach((el) => el.classList.remove('active'));
      tabContents.forEach((tc) => tc.classList.remove('active'));
      li.classList.add('active');
      tabContents[index].classList.add('active');
    });
  });
}
