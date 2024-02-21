document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card');
  const info = document.getElementById('info');
  const back = document.getElementById('back');

  let originalCardPositions = []; // Almacena las posiciones originales de las cartas

  // Almacena las posiciones originales de las cartas
  cards.forEach(function(card) {
    originalCardPositions.push({ 
      top: card.style.top,
      left: card.style.left,
      transform: card.style.transform
    });
  });

  cards.forEach(function(card, index) {
    card.addEventListener("click", function() {
      cards.forEach(function(card, idx) {
        if (idx !== index) {
          card.style.transition = "transform 2s ease";
          card.style.transform = "translateY(-300%)";
        } else {
          card.style.transition = "transform 2s ease, top 2s ease, left 2s ease";
          card.style.transform = "rotate(0deg)";
          card.style.top = "3%";
          card.style.left = "-10%";
        }
      });

      info.style.transition = "transform 1s ease";
      info.style.transform = "translateY(0)";

      switch (index) {
        case 0:
          fetchCharacterData("https://swapi.dev/api/people/13/");
          console.log("holi");
          break;
        case 1:
          fetchCharacterData("https://swapi.dev/api/people/4/");
          break;
        case 2:
          fetchCharacterData("https://swapi.dev/api/people/3/");
          break;
        case 3:
          fetchCharacterData("https://swapi.dev/api/people/2/");
          break;
        case 4:
          fetchCharacterData("https://swapi.dev/api/people/20/");
          break;
      }
    });
  });

  back.addEventListener("click", function() {
    // Ocultar el div info con una animación hacia arriba
    info.style.transition = "transform 2s ease";
    info.style.transform = "translateY(300%)"; // Ocultarlo nuevamente
    // Restaurar las posiciones originales de las cartas
    cards.forEach(function(card, index) {
      card.style.transition = "transform 1s ease, top 1s ease, left 1s ease";
      card.style.transform = originalCardPositions[index].transform;
      card.style.top = originalCardPositions[index].top;
      card.style.left = originalCardPositions[index].left;
    });
  });
});

// Agregar listeners para las opciones del menú
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedOption = item.textContent.trim();

      switch (selectedOption) {
        case 'Datos Personales':
          // Cargar los datos personales nuevamente
          loadCharacterData(lastCharacterData);
          break;
        case 'Planeta':
          // Cargar los datos del planeta
          fetchPlanetData(lastCharacterHomeworld);
          break;
        case 'Aparición en Películas':
          // Cargar los datos de las películas
          fetchFilmData(lastCharacterFilms);
          break;
        case 'Otros Datos':
          // Cargar otros datos
          loadOtherCharacterData(lastCharacterData);
          break;
        // Agregar casos para otras opciones del menú si es necesario
      }
    });
  });
});


// Función para cargar los datos del personaje desde la API
function fetchCharacterData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      // Guardar los últimos datos de personaje obtenidos
      lastCharacterData = data;
      lastCharacterHomeworld = data.homeworld;
      lastCharacterFilms = data.films;

      // Mostrar los datos del personaje
      loadCharacterData(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Función para cargar los datos personales del personaje
function loadCharacterData(data) {
  const characterData = document.getElementById('data');
  characterData.innerHTML = ''; // Limpiar contenido previo

  const characterInfo = document.createElement('div');
  characterInfo.classList.add('character-info');

  const name = document.createElement('h2');
  name.textContent = data.name;

  const height = document.createElement('p');
  height.textContent = `Altura: ${data.height}`;

  const mass = document.createElement('p');
  mass.textContent = `Peso: ${data.mass}`;

  const hairColor = document.createElement('p');
  hairColor.textContent = `Color de pelo: ${data.hair_color}`;

  const skinColor = document.createElement('p');
  skinColor.textContent = `Color de piel: ${data.skin_color}`;

  const eyeColor = document.createElement('p');
  eyeColor.textContent = `Color de ojos: ${data.eye_color}`;

  const birthYear = document.createElement('p');
  birthYear.textContent = `Años de nacimiento: ${data.birth_year}`;

  const gender = document.createElement('p');
  gender.textContent = `Género: ${data.gender}`;

  characterInfo.appendChild(name);
  characterInfo.appendChild(height);
  characterInfo.appendChild(mass);
  characterInfo.appendChild(hairColor);
  characterInfo.appendChild(skinColor);
  characterInfo.appendChild(eyeColor);
  characterInfo.appendChild(birthYear);
  characterInfo.appendChild(gender);

  characterData.appendChild(characterInfo);
}

// Función para cargar los datos del planeta
function fetchPlanetData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      const characterData = document.getElementById('data');
      characterData.innerHTML = ''; // Limpiar contenido previo

      const planetInfo = document.createElement('div');
      planetInfo.classList.add('planet-info');

      const name = document.createElement('h2');
      name.textContent = data.name;

      const rotationPeriod = document.createElement('p');
      rotationPeriod.textContent = `Periodo de rotación: ${data.rotation_period}`;

      const orbitalPeriod = document.createElement('p');
      orbitalPeriod.textContent = `Periodo orbital: ${data.orbital_period}`;

      const diameter = document.createElement('p');
      diameter.textContent = `Diámetro: ${data.diameter}`;

      const climate = document.createElement('p');
      climate.textContent = `Clima: ${data.climate}`;

      const gravity = document.createElement('p');
      gravity.textContent = `Gravedad: ${data.gravity}`;

      const terrain = document.createElement('p');
      terrain.textContent = `Terreno: ${data.terrain}`;

      const surfaceWater = document.createElement('p');
      surfaceWater.textContent = `Superficie del agua: ${data.surface_water}`;

      const population = document.createElement('p');
      population.textContent = `Población: ${data.population}`;

      planetInfo.appendChild(name);
      planetInfo.appendChild(rotationPeriod);
      planetInfo.appendChild(orbitalPeriod);
      planetInfo.appendChild(diameter);
      planetInfo.appendChild(climate);
      planetInfo.appendChild(gravity);
      planetInfo.appendChild(terrain);
      planetInfo.appendChild(surfaceWater);
      planetInfo.appendChild(population);

      characterData.appendChild(planetInfo);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Función para cargar los datos de las películas
function fetchFilmData(filmUrls) {
  const filmPromises = filmUrls.map(url => fetch(url));

  Promise.all(filmPromises)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(films => {
      console.log(films);

      const characterData = document.getElementById('data');
      characterData.innerHTML = ''; // Limpiar contenido previo

      const filmsInfo = document.createElement('div');
      filmsInfo.classList.add('films-info');

      const titleHeader = document.createElement('h2');
      titleHeader.textContent = 'Aparición en Películas';

      const filmsList = document.createElement('ul');
      filmsList.classList.add('films-list');

      films.forEach(film => {
        const filmItem = document.createElement('li');

        const filmTitle = document.createElement('p');
        filmTitle.textContent = `Título: ${film.title}`;

        const episodeId = document.createElement('p');
        episodeId.textContent = `Episodio: ${film.episode_id}`;

        const director = document.createElement('p');
        director.textContent = `Director: ${film.director}`;

        const producer = document.createElement('p');
        producer.textContent = `Productor: ${film.producer}`;

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Fecha de Lanzamiento: ${film.release_date}`;

        filmItem.appendChild(filmTitle);
        filmItem.appendChild(episodeId);
        filmItem.appendChild(director);
        filmItem.appendChild(producer);
        filmItem.appendChild(releaseDate);

        filmsList.appendChild(filmItem);
      });

      filmsInfo.appendChild(titleHeader);
      filmsInfo.appendChild(filmsList);

      characterData.appendChild(filmsInfo);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Función para cargar otros datos del personaje
function loadOtherCharacterData(data) {
    if (!data.species.length) {
      data.species.push("https://swapi.dev/api/species/1/");
    }
  
    const characterData = document.getElementById('data');
    characterData.innerHTML = ''; // Limpiar contenido previo
  
    const otherData = document.createElement('div');
    otherData.classList.add('other-data');
  
    let hasContent = false; // Variable para rastrear si hay contenido para mostrar
  
    // Agregar datos de vehículos si existen
    if (data.vehicles.length > 0) {
      hasContent = true; // Hay contenido para mostrar
      const vehiclesInfo = document.createElement('div');
      vehiclesInfo.classList.add('vehicles-info');
  
      const vehiclesTitle = document.createElement('h3');
      vehiclesTitle.textContent = 'Vehículos';
  
      data.vehicles.forEach(vehicleUrl => {
        fetch(vehicleUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(vehicleData => {
            const vehicleItem = document.createElement('div');
            vehicleItem.classList.add('vehicle-item');
  
            const name = document.createElement('p');
            name.textContent = `Nombre: ${vehicleData.name}`;
  
            const model = document.createElement('p');
            model.textContent = `Modelo: ${vehicleData.model}`;
  
            // Agregar otros datos de vehículos aquí...
  
            vehicleItem.appendChild(name);
            vehicleItem.appendChild(model);
            // Agregar otros datos de vehículos al elemento vehicleItem...
  
            vehiclesInfo.appendChild(vehicleItem);
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      });
  
      otherData.appendChild(vehiclesTitle);
      otherData.appendChild(vehiclesInfo);
    }
  
    // Agregar datos de starships si existen
    if (data.starships.length > 0) {
      hasContent = true; // Hay contenido para mostrar
      const starshipsInfo = document.createElement('div');
      starshipsInfo.classList.add('starships-info');
  
      const starshipsTitle = document.createElement('h3');
      starshipsTitle.textContent = 'Starships';
  
      data.starships.forEach(starshipUrl => {
        fetch(starshipUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(starshipData => {
            const starshipItem = document.createElement('div');
            starshipItem.classList.add('starship-item');
  
            const name = document.createElement('p');
            name.textContent = `Nombre: ${starshipData.name}`;
  
            const model = document.createElement('p');
            model.textContent = `Modelo: ${starshipData.model}`;
  
            // Agregar otros datos de starships aquí...
  
            starshipItem.appendChild(name);
            starshipItem.appendChild(model);
            // Agregar otros datos de starships al elemento starshipItem...
  
            starshipsInfo.appendChild(starshipItem);
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      });
  
      otherData.appendChild(starshipsTitle);
      otherData.appendChild(starshipsInfo);
    }
  
    // Mostrar los datos solo si hay contenido
    if (hasContent) {
      characterData.appendChild(otherData);
    }

  // Obtener datos de especies
  data.species.forEach(speciesUrl => {
    fetch(speciesUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(speciesData => {
        // Agregar título para la sección de especies
        const speciesTitle = document.createElement('h3');
        speciesTitle.textContent = 'Especie';
  
        // Agregar datos de especies
        const speciesInfo = document.createElement('div');
        speciesInfo.classList.add('species-info');
  
        const speciesName = document.createElement('p');
        speciesName.textContent = `Tipo: ${speciesData.name}`;
  
        const classification = document.createElement('p');
        classification.textContent = `Clasificación: ${speciesData.classification}`;
  
        const designation = document.createElement('p');
        designation.textContent = `Designación: ${speciesData.designation}`;
  
        const averageHeight = document.createElement('p');
        averageHeight.textContent = `Altura media: ${speciesData.average_height}`;
  
        const skinColors = document.createElement('p');
        skinColors.textContent = `Colores de piel: ${speciesData.skin_colors}`;
  
        const hairColors = document.createElement('p');
        hairColors.textContent = `Colores de pelo: ${speciesData.hair_colors}`;
  
        const eyeColors = document.createElement('p');
        eyeColors.textContent = `Colores de ojos: ${speciesData.eye_colors}`;
  
        const averageLifespan = document.createElement('p');
        averageLifespan.textContent = `Promedio de vida: ${speciesData.average_lifespan}`;
  
        const language = document.createElement('p');
        language.textContent = `Lenguaje: ${speciesData.language}`;
  
        speciesInfo.appendChild(speciesName);
        speciesInfo.appendChild(classification);
        speciesInfo.appendChild(designation);
        speciesInfo.appendChild(averageHeight);
        speciesInfo.appendChild(skinColors);
        speciesInfo.appendChild(hairColors);
        speciesInfo.appendChild(eyeColors);
        speciesInfo.appendChild(averageLifespan);
        speciesInfo.appendChild(language);
  
        // Agregar el título y los datos de especies a la sección de otros datos
        otherData.appendChild(speciesTitle);
        otherData.appendChild(speciesInfo);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  });

  characterData.appendChild(otherData);
}

let lastCharacterData; // Almacena los últimos datos de personaje obtenidos
let lastCharacterHomeworld; // Almacena la última URL del planeta del personaje
let lastCharacterFilms; // Almacena la lista de URLs de las películas donde aparece el personaje


const divRain = document.querySelector('.rain');

// Función para generar una sola gota de lluvia
function createRainDrop() {
  const drop = document.createElement('drop');
  const x = Math.random() * innerWidth;
  const time = 15 * Math.random();
  const height = Math.floor(Math.random() * 10) + 5;

  drop.style.animationDuration = time + 's';
  drop.style.left = x + 'px';
  drop.style.height = height + 'px';
  drop.style.opacity = Math.random();

  divRain.appendChild(drop);
}

// Función para generar la lluvia
function rain(numDrops) {
  for (let j = 0; j < numDrops; j++) {
    createRainDrop();
  }
}

rain(80); // Genera 80 gotas de lluvia
