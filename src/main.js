import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myForm = document.querySelector('.form');
const userInput = document.querySelector('input[name="search-text"]');


let totalHits = 0;
let page = 1;
let query = '';
const loadMoreBtn = document.querySelector('.load-more');

myForm.addEventListener('submit', onSubmit);
async function onSubmit(event) {
  event.preventDefault();
  query = userInput.value.trim();
  let page = 1;
  if (query === '') {
    myForm.reset();
    iziToast.warning({
      title: 'Error',
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const myData = await getImagesByQuery(query, page);
    totalHits = myData.totalHits;
    if (myData.hits.length === 0) {
      iziToast.info({
        timeout: 7000,
        displayMode: 'once',
        title: 'Try another one',
        message:
          '❌ Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    } 
      createGallery(myData.hits);
      if (totalHits > 15) {
        showLoadMoreButton();
      }

      myForm.reset();
    
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'There is some error, please try another time',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);
async function onLoadMore() {
try {
  
    page += 1;
    showLoader();
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    scrollPage();

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Notice',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }    
} catch (error) {
  iziToast.error({
    title: 'Error',
    message: 'There is some error, please try another time',
    position: 'topRight',
  });
} finally {
  hideLoader();
} };

function scrollPage(){
    const card = document.querySelector('.gallery-item');
    if (!card){
        return;
    };
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight*2,
        behavior: 'smooth',
    });
};