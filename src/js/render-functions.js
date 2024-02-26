import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './pixabay-api';

const searchInput = document.querySelector('#search-input');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');
const navigationForm = document.querySelector('.navigation');
const moreButton = document.querySelector('#more');
const msg = document.getElementById('message');

export const refs = {
  searchInput,
  gallery,
  loader,
  navigationForm,
  moreButton,
  msg,
};

export const serviceVars = { PAGE: 1, SEARCH_WORD: '' };

export const lightbox = new SimpleLightbox(
  '#gallery .gallery-item .gallery-link ',
  {
    dowload: false,
    close: true,
    closeText: '×',
    captions: true,
    captionsData: 'alt',
    captionType: 'attr',
    captionDelay: 250,
    captionSelector: 'img',
  }
);

export async function getGallery(value, page) {
  serviceVars.SEARCH_WORD = value;
  closeMoreButton();
  showLoder();
  try {
    const { data } = await getImages(value, page);
    arrLengthChecker(data.hits) && !value.length;
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
    closeLoder();
    showMoreButton();

    if (!data.hits.length && data.total) {
      closeLoder();
      closeMoreButton();
      // msg.style.display = 'inline-block';
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
        title: '',
        color: 'blue',
      });
    }

    if (page === 1) {
      gallery.innerHTML = galleryTemplate;
    } else {
      gallery.insertAdjacentHTML('beforeend', galleryTemplate);

      window.scrollBy({
        behavior: 'smooth',
        top:
          Math.ceil(gallery.firstElementChild.getBoundingClientRect().height) *
          6,
      });
    }

    lightbox.refresh();
  } catch (error) {
    closeLoder();
    iziToast.show({
      message: `"Sorry, there are no images matching your search query. Please try again!"`,
      position: 'topRight',
      title: '',
      color: 'red',
    });
  }

  closeLoder();
  searchInput.value = '';
}

export function showLoder() {
  refs.loader.style.display = 'inline-block';
}

export function closeLoder() {
  refs.loader.style.display = 'none';
}

export function showMoreButton() {
  refs.moreButton.style.display = 'inline-block';
}

export function closeMoreButton() {
  refs.moreButton.style.display = 'none';
}

export function arrLengthChecker(arr) {
  if (!arr.length) {
    closeMoreButton();
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      title: '',
      color: 'red',
    });
  }
}
