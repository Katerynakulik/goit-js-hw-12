import {getImagesByQuery} from './js/pixabay-api';
import {createGallery,
    clearGallery,
    showLoader,
    hideLoader
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myForm= document.querySelector(".form");
const userInput = document.querySelector('input[name="search-text"]');

myForm.addEventListener("submit", onSubmit);
async function onSubmit(event){
    event.preventDefault();
    const query = userInput.value.trim();
    if (query===""){
        myForm.reset();
        iziToast.warning({
            title: 'Error',
            message: 'Search field cannot be empty!',
            position: "topRight",
        })
    return;}
    clearGallery();
    showLoader();
    try {
        const myData = await getImagesByQuery(query);    
        if (myData.hits.length === 0){
            iziToast.info({
                    timeout: 7000,
                    displayMode: 'once',
                    title: 'Try another one',
                    message: '❌ Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
            });
            return;
    }else{
        createGallery(myData.hits);
        myForm.reset();
    }
        }catch(error){
            iziToast.error({
                title: 'Error',
                message: 'There is some error, please try another time',
                position: "topRight",
            });
        }finally{
            hideLoader();           
        }
    }