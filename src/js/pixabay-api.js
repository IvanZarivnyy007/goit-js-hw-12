import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export function getImages(searchParams, page) {
  const value = searchParams.trim();
  console.log({ value });
  if (value) {
    return instance.get(END_POINT, {
      params: {
        key: '42279202-5e6657fc85e4b10c09189e202',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: value,
        page: page,
        per_page: 15,
      },
    });
  } else {
    return Promise.reject();
  }
}
