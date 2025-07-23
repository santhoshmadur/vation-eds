export default function decorate(block) {
  const sections = [...block.children].slice(1); // skip the title (first div)
  const tabTitles = [];
  const tabContents = [];
  const allSections = [...block.children];
  const titleSection = allSections[0];

  // Build title list and content blocks
  sections.forEach((section) => {
    const [titleWrapper, contentWrapper, imageWrapper] = section.children;
    const title = titleWrapper.querySelector('p')?.textContent?.trim();
    tabTitles.push(title);

    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('tab-text');
    contentDiv.innerHTML = contentWrapper.innerHTML;

    // Insert <hr> after each <p> except the last two
    const pTags = contentDiv.querySelectorAll('p');
    pTags.forEach((p, index) => {
      if (index < pTags.length - 2) {
        const hr = document.createElement('hr');
        p.after(hr);
      }
    });

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('tab-image');
    imageDiv.innerHTML = imageWrapper.innerHTML;

    tabContent.append(contentDiv, imageDiv);
    tabContents.push(tabContent);
  });

  // Create tab header
  const tabList = document.createElement('ul');
  tabList.className = 'tab-header';

  tabTitles.forEach((title, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<a>${title}</a>`;
    if (index === 0) li.classList.add('active');
    li.addEventListener('click', () => {
      // Remove active from all
      tabList.querySelectorAll('li').forEach((el) => el.classList.remove('active'));
      tabContents.forEach((tc) => tc.classList.remove('active'));
      // Activate selected
      li.classList.add('active');
      tabContents[index].classList.add('active');
    });
    tabList.appendChild(li);
  });

  // Add header and tabs to block
  const title = document.createElement('div');
  title.className = 'main-title';
  const titleText = titleSection.querySelector('p')?.textContent.trim();
  title.textContent = titleText;

  const tabContainer = document.createElement('div');
  tabContainer.classList.add('tab-container-main');

  tabContents.forEach((content, index) => {
    if (index === 0) content.classList.add('active');
    tabContainer.appendChild(content);
  });

  block.append(title, tabList, tabContainer);
}
