const BREEDS_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('select');
let currentBreed = "";
const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

function getNewDog(url, breed) {
    spinner.classList.remove('hidden');
    img.classList.add('hidden');

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            img.src = data.message;
            img.alt = `Cute ${breed}`;
        });
}

getNewDog('https://dog.ceo/api/breeds/image/random', 'dog');

fetch(BREEDS_LIST_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const breeds = Object.keys(data.message);

        for (let i = 0; i < breeds.length; i++) {
            const option = document.createElement('option');
            option.value = breeds[i];
            option.innerText = breeds[i];
            select.appendChild(option);
        }
    });

select.addEventListener("change", function(event) {
    if (event.target.value === "select-breed") {
        getNewDog('https://dog.ceo/api/breeds/image/random', 'dog');
    } else {
        let dogByBreedURL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
        currentBreed = event.target.value;
        
        getNewDog(dogByBreedURL, event.target.value);
    }
});

img.addEventListener("load", function(event) {
    spinner.classList.add('hidden');
    event.target.classList.remove('hidden');
});

document.querySelector('.find-another').addEventListener("click", function(event) {
    if (select.value === "select-breed") {
        getNewDog('https://dog.ceo/api/breeds/image/random', 'dog');
    } else {
        const dogByBreedURL = `https://dog.ceo/api/breed/${select.value}/images/random`;
        getNewDog(dogByBreedURL, select.value);
    }
});