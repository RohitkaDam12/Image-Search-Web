const accessKey = "P7HaF91nKYSNRGM1DPmNho7Anexi_YF5T-D8wd5YQ3M";

const fromEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("Show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if(page===1){
    searchResults.innerHTML = ""
  }
  
  results.map((result)=>{

    const imageWrapper = document.createElement('div'); // phele div banaya 

    imageWrapper.classList.add("search-result"); //class of div

    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement('a'); // anchor tag ke liye yee kiya 
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++
  if(page>1){
    showMore.style.display = "block";
  }
}

fromEl.addEventListener("submit", (event) =>{
  event.preventDefault();
  page = 1;
  searchImages();
})

showMore.addEventListener("click", () =>{
  searchImages();
})