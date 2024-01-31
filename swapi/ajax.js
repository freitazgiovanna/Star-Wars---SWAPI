var modals = document.querySelectorAll('.card_modal');
var modalsPerPage = 10;
var currentPage = 0;

async function swapi(page, index) {

    const loadingImage = document.getElementById(`loadingImage${index + 1}`);
    loadingImage.style.display = 'block';

    fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then(response => response.json())
        .then(async data => {
            const results = data.results;

            const character = results[index];
            const modalContent = document.getElementById(`details${index + 1}`);
            const title = document.getElementById(`title${index + 1}`);
            const starships = character.starships;
            let homeworld = character.homeworld;
            const vehicles = character.vehicles;
            const films = character.films;
            const species = character.species
            let starshipsNames = [];
            let homeworldNames = "";
            let vehiclesNames = [];
            let filmsNames = [];
            let speciesNames = [];

            for (let i = 0; i < starships.length; i++) {

                starshipsNames[i] = await fetch(`${starships[i]}`)
                    .then(async response => response.json())
                    .then(async starshipsData => {
                        return starshipsData.name;
                    });
            }

            homeworldNames = await fetch(`${homeworld}`)
                .then(async response => response.json())
                .then(async homeworldData => {
                    return homeworldData.name;
                });


            for (let i = 0; i < vehicles.length; i++) {

                vehiclesNames[i] = await fetch(`${vehicles[i]}`)
                    .then(async response => response.json())
                    .then(async vehiclesData => {
                        return vehiclesData.name;
                    });
            }

            for (let i = 0; i < films.length; i++) {

                filmsNames[i] = await fetch(`${films[i]}`)
                    .then(response => response.json())
                    .then(async filmsData => {
                        return filmsData.title;
                    });
            }

            for (let i = 0; i < species.length; i++) {

                speciesNames[i] = await fetch(`${species[i]}`)
                    .then(async response => response.json())
                    .then(async speciesData => {
                        return speciesData.name;
                    });
            }

            const startshipsResult = starshipsNames.join(', ');
            const vehiclesResult = vehiclesNames.join(', ');
            const filmsResult = filmsNames.join(', ');
            const speciesResult = speciesNames.join(', ');


            title.innerHTML = `${character.name}`;

            modalContent.innerHTML = ` 
        <p><strong>Name:</strong> ${character.name}</p>
        <p><strong>Height:</strong> ${character.height}cm</p>
        <p><strong>Mass:</strong> ${character.mass}kg</p>
        <p><strong>Hair Color:</strong> ${character.hair_color}</p>
        <p><strong>Skin Color:</strong> ${character.skin_color}</p>
        <p><strong>Eye Color:</strong> ${character.eye_color}</p>
        <p><strong>Birth Year:</strong> ${character.birth_year}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Starships:</strong> ${startshipsResult}</p>
        <p><strong>Vehicles:</strong> ${vehiclesResult}</p>
        <p><strong>Films:</strong> ${filmsResult}</p>
        <p><strong>Species:</strong> ${speciesResult}</p>
        <p><strong>Home:</strong> ${homeworldNames}</p>
        `;

        loadingImage.style.display = 'none';


            const modal = document.getElementById(`my_modal${index + 1}`);
            modal.style.display = 'block';

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        });
}


function showDetails(page, index) {
    swapi(page, index);

    const teste = document.getElementById(`details${index + 1}`);
    teste.innerHTML = ""

    const modal = document.getElementById(`my_modal${index + 1}`);
    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function showModals() {
    var start = currentPage * modalsPerPage;
    var end = start + modalsPerPage;
    modals.forEach(function (modal, index) {
        if (index >= start && index < end) {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    });
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        showModals();
        showDetails()
    }
}

function nextPage() {
    if (currentPage < Math.ceil(modals.length / modalsPerPage) - 1) {
        currentPage++;
        showModals();
        showDetails()
    }
}

// function pages(page) {
//     swapi(page)
//     if (currentPage == 0) {
//         swapi(1)
//     } else if (currentPage == 1) {
//         swapi(2)
//     } else if (currentPage == 2) {
//         swapi(3)
//     } else if (currentPage == 3) {
//         swapi(4)
//     } else if (currentPage == 4) {
//         swapi(5)
//     } else if (currentPage == 5) {
//         swapi(6)
//     } else if (currentPage == 6) {
//         swapi(7)
//     } else if (currentPage == 7) {
//         swapi(8)
//     } else {
//         swapi(9)
//     }
// }

document.getElementById('previousButton').addEventListener('click', previousPage);
document.getElementById('nextButton').addEventListener('click', nextPage);

showModals();
