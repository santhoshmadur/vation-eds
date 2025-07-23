export default function decorate(block) {
  const allSections = [...block.children];
  const titleSection = allSections[0];
  const sections = allSections.slice(1); // skip the title
  const tabTitles = [];

  // Create wrapper to hold the enhanced layout
  const wrapper = document.createElement('div');
  wrapper.classList.add('tab-wrapper');

  // Build main title
  const title = document.createElement('div');
  title.className = 'main-title';
  const titleText = titleSection.querySelector('p')?.textContent?.trim();
  title.textContent = titleText;

  // Create tab header
  const tabList = document.createElement('ul');
  tabList.className = 'tab-header';

  // Create tab content container
  const tabContainer = document.createElement('div');
  tabContainer.classList.add('tab-container-main');

  // Process each section
  sections.forEach((section, index) => {
    const [titleWrapper, contentWrapper, imageWrapper] = section.children;
    const tabTitle = titleWrapper.querySelector('p')?.textContent?.trim();
    tabTitles.push(tabTitle);

    const li = document.createElement('li');
    li.innerHTML = `<a>${tabTitle}</a>`;
    if (index === 0) li.classList.add('active');
    tabList.appendChild(li);

    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    if (index === 0) tabContent.classList.add('active');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('tab-text');
    contentDiv.innerHTML = contentWrapper.innerHTML;

    const pTags = contentDiv.querySelectorAll('p');
    pTags.forEach((p, i) => {
      if (i < pTags.length - 2) {
        const hr = document.createElement('hr');
        p.after(hr);
      }
    });

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('tab-image');
    imageDiv.innerHTML = imageWrapper.innerHTML;

    tabContent.append(contentDiv, imageDiv);
    tabContainer.appendChild(tabContent);

    // Event listener
    li.addEventListener('click', () => {
      tabList.querySelectorAll('li').forEach((el) => el.classList.remove('active'));
      tabContainer.querySelectorAll('.tab-content').forEach((tc) => tc.classList.remove('active'));
      li.classList.add('active');
      tabContent.classList.add('active');
    });
  });

  // Append built UI without clearing block content
  wrapper.append(title, tabList, tabContainer);
  block.appendChild(wrapper);
}
