import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './pixabay-api';

let PAGE = 1;
let SEARCH_WORD = '';

let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
let gallery = document.querySelector('#gallery');
let loader = document.querySelector('.loader');
let moreButton = document.querySelector('#more');
let msg = document.getElementById('message');

// const navigationForm = document.querySelector('.navigation');

// export const refs = {
//   searchInput,
//   gallery,
//   loader,
//   navigationForm,
// };

let lightbox = new SimpleLightbox('#gallery .gallery-item .gallery-link ', {
  dowload: false,
  close: true,
  closeText: '×',
  captions: true,
  captionsData: 'alt',
  captionType: 'attr',
  captionDelay: 250,
  captionSelector: 'img',
});

async function getButtonClickHandler(value, page) {
  SEARCH_WORD = value;
  loader.style.display = 'inline-block';
  try {
    const { data } = await getImages(value, page);
    const galleryTemplate = data.hits
      .map(hit => {
        return `<div class="gallery-item">
  <a class="gallery-link" href="${hit.largeImageURL}">
      <img class="gallery-image" src="${hit.webformatURL}" alt="${hit.tags}" />
  </a>
  <div class="image-info">
      <div><b>Likes</b> ${hit.likes}</div>
      <div><b>Views</b> ${hit.views}</div>
      <div><b>Comments</b> ${hit.comments}</div>
      <div><b>Downloads</b> ${hit.downloads}</div>
  </div>
  </div>`;
      })
      .join('');
    loader.style.display = 'none';
    moreButton.style.display = 'inline-block';

    if (!data.hits.length && data.total) {
      loader.style.display = 'none';
      moreButton.style.display = 'none';
      msg.style.display = 'inline-block';
    }

    if (page === 1) {
      gallery.innerHTML = galleryTemplate;
    } else {
      gallery.innerHTML += galleryTemplate;

      window.scrollBy({
        behavior: 'smooth',
        top:
          Math.ceil(gallery.firstElementChild.getBoundingClientRect().height) *
          6,
      });
    }

    lightbox.refresh();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.show({
      message: `"Sorry, there are no images matching your search query. Please try again!"`,
      position: 'topRight',
      title: '',
      color: 'red',
    });
  }

  searchInput.value = '';
}
searchButton.addEventListener('click', () => {
  PAGE = 1;
  getButtonClickHandler(searchInput.value, PAGE);
  PAGE += 1;
});
moreButton.addEventListener('click', () => {
  getButtonClickHandler(SEARCH_WORD, PAGE);
  PAGE += 1;
});

// export function showLoder() {
//   refs.loader.style.display = 'inline-block';
// }

// export function closeLoder() {
//   refs.loader.style.display = 'none';
// }

// export function arrLengthChecker(arr) {
//   if (!arr.length) {
//     iziToast.error({
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       position: 'topRight',
//       title: '',
//       color: 'red',
//     });
//   }
// }
