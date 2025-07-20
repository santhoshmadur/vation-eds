import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load header as fragment
  const headerMeta = getMetadata('header');
  const headerPath = headerMeta ? new URL(headerMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(headerPath);

  // decorate header DOM
  block.textContent = '';
  const header = document.createElement('div');
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  // Add event listener to social icon to load search bar and hide icon
  header.addEventListener('click', (e) => {
    const socialIcon = e.target.closest('.social-icon');
    if (socialIcon && !header.querySelector('.w-search')) {
      // Hide the social icon (search icon)
      socialIcon.style.display = 'none';
      // Create and insert the search bar after the icon
      const searchBar = document.createElement('div');
      searchBar.innerHTML = '<div class="w-search layout_modern ush_search_1 active"><div class="w-search-form"><form class="w-search-form-h" autocomplete="off" action="https://vation.com/" method="get"><div class="w-search-form-field"><input type="text" name="s" id="us_form_search_s" placeholder="Search"><span class="w-search-form-row-field-bar"></span></div><div class="w-search-close"></div></form></div><a class="w-search-open" href="javascript:void(0);"></a></div>';
      const searchBox = searchBar.firstElementChild;
      // Insert after the social icon
      socialIcon.parentNode.insertBefore(searchBox, socialIcon.nextSibling);
      // Add event listener to close button
      const closeBtn = searchBox.querySelector('.w-search-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          searchBox.remove();
          socialIcon.style.display = '';
        });
      }
    }
  });

  block.append(header);
}
