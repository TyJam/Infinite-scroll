const ImageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;//when the page load we want it to be false
let imagesLoaded = 0; 
let totalImages = 0; 
let photosArray = [];


//Unsplash API 
const count = 30;
const apiKey= '9u2rx5GgqC3UZ05nLt009FTVTBstp_30NjIM43E4DW8'
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
 
//check if all images were load 
//call for each individual image 
function imageLoaded(){
    //console.log('image loaded');
    imagesLoaded++; 
    //console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true; 
        console.log('ready =', ready);
    }

}

//Helper Function to set Attributes on DOM Elements 
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos(){   
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images',  totalImages);
    //Run function for each object photosArray 
    photosArray.forEach((photo) =>{
        //Create <a> to link to unsplash 
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank',
        })
        //Create <img> for photo 
        const img = document.createElement('img');
       // img.setAttribute('src', photo.urls.regular);
       // img.setAttribute('alt', photo.alt_description);
       // img.setAttribute('title', photo.alt_description);
       setAttributes(img, {
           src: photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description
       });

       //Event Listener, check when each is finished loading   
       img.addEventListener('load', imageLoaded);

        //Put <img> inside <a></a>, then put inside imageContainer Element 
        item.appendChild(img);
        ImageContainer.appendChild(item);
    });
}
//Get photos from unsplash API 
async function getPhotos(){
    try{

        const response = await fetch(apiUrl)
        photosArray = await response.json()
        //console.log(photosArray);  
        displayPhotos();
    }catch(error){
        //Catch Error Here 
    }
}

//Check to see if scrolling near bottom of page, Load More Photos 
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 
        1000 && ready){
            ready = false;
        /*console.log('window.innerHeight' , window.innerHeight);
        console.log('windowe.scrolly: ', window.scrollY);
        console.log('window.innerHeight + scrollY', window.scrollyY+ window.innerHeight);
        console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);*/
        getPhotos();
        //console.log('load more');

    }
                                                                                                                                                                                                                                                                                                                                                                                             
})
//On Load 
getPhotos();