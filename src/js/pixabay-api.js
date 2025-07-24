import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51454190-e114164169ef9dafb1528e77f';

function getImagesByQuery(query) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  };
  return axios
    .get(BASE_URL, {params: searchParams})
    .then((response) => response.data)
    .catch(error => {
      console.error("Error fetching images:",error);
      throw new Error("Sorry, there are no images matching your search query. Please try again!")
    });
};
export {getImagesByQuery};