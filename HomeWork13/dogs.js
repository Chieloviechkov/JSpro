const breedsList = document.getElementById('breeds');
const dogImage = document.getElementById('dog-image');

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        const breeds = Object.keys(data.message);

        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            li.addEventListener('click', () => {
                fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                    .then(response => response.json())
                    .then(data => {
                        dogImage.src = data.message;
                    });
            });

            breedsList.appendChild(li);
        });
    })
    .catch(error => console.error('Помилка:', error));
