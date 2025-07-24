import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const container = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });

export function createGallery(images) {
  function itemInsert({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-describe">
        <div class="img-info">
          <b>Likes</b>
          <p>${likes}</p>
        </div>
        <div class="img-info">
          <b>Views</b>
          <p>${views}</p>
        </div>
        <div class="img-info">
          <b>Comments</b>
          <p>${comments}</p>
        </div>
        <div class="img-info">
          <b>Downloads</b>
          <p>${downloads}</p>
        </div>
        </div>
      </li>
    `;
  }
  const newGallery = images.map(itemInsert).join('');
  container.insertAdjacentHTML('beforeend', newGallery);
 
  lightbox.refresh();
};

export function clearGallery(){
    container.innerHTML="";
};
 export function showLoader(){
    document.querySelector('.loader').classList.remove('is-hidden');
 };
  export function hideLoader(){
    document.querySelector('.loader').classList.add('is-hidden');
 };

console.log("mygallery", container);