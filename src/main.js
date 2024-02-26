import { refs, getGallery, serviceVars } from './js/render-functions';

refs.navigationForm.addEventListener('submit', e => {
  e.preventDefault();
  serviceVars.PAGE = 1;
  getGallery(refs.searchInput.value, serviceVars.PAGE);
  serviceVars.PAGE += 1;
});
refs.moreButton.addEventListener('click', () => {
  getGallery(serviceVars.SEARCH_WORD, serviceVars.PAGE);
  serviceVars.PAGE += 1;
});
