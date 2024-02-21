$(document).ready(function() {

  // Comienzo declarando tres variables que harán referencia a las cartas, al div que tendrá
  // toda la información de la API y a la flecha que me servirá para volver hacia atrás y
  // seleccionar otra carta
  const cards = $('.card');
  const info = $('#info');
  const back = $('#back');

  let originalCardPositions = []; // Array para almacenar las posiciones originales de las cartas

  // Almaceno las posiciones originales de las cartas
  cards.each(function() {
    originalCardPositions.push({ 
      top: $(this).css('top'),
      left: $(this).css('left'),
      transform: $(this).css('transform')
    });
  });

  // Función para mover las cartas hacia arriba, menos la seleccionada que se quedará a la
  // izquierda del cuadrado que también muestro a la vez que se mueven las cartas
  cards.each(function(index) {
    $(this).on("click", function() {
      cards.each(function(idx) {
        if (idx !== index) {
          $(this).css('transition', 'transform 2s ease');
          $(this).css('transform', 'translateY(-300%)');
        } else {
          $(this).css('transition', 'transform 2s ease, top 2s ease, left 2s ease');
          $(this).css('transform', 'rotate(0deg)');
          $(this).css('top', '3%');
          $(this).css('left', '-10%');
        }
      });

      info.css('transition', 'transform 1s ease');
      info.css('transform', 'translateY(0)');

      // Dependiendo de la carta seleccionada, se cargargarán unos datos u otros
      switch (index) {
        case 0:
          fetchCharacterData("https://swapi.dev/api/people/13/");
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

  back.on("click", function() {
    // Oculto el div info con una animación
    info.css('transition', 'transform 2s ease');
    info.css('transform', 'translateY(300%)');
    // Restauro las posiciones originales de las cartas
    cards.each(function(index) {
      $(this).css('transition', 'transform 1s ease, top 1s ease, left 1s ease');
      $(this).css('transform', originalCardPositions[index].transform);
      $(this).css('top', originalCardPositions[index].top);
      $(this).css('left', originalCardPositions[index].left);
    });
  });

  // Agrego listeners para las opciones del menú, para decidir qué datos mostrar
  $('.menu-item').on('click', function() {
    const selectedOption = $(this).text().trim();

    switch (selectedOption) {
      case 'Datos Personales':
        // Cargar los datos personales
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
    }
  });
});

// Función para cargar los datos del personaje desde la API
function fetchCharacterData(url) {
  $.ajax({
    url: url,
    method: 'GET',
    success: function(data) {
      console.log(data);

      // Guardo los últimos datos de personaje obtenidos
      lastCharacterData = data;
      lastCharacterHomeworld = data.homeworld;
      lastCharacterFilms = data.films;

      // Muestro los datos del personaje
      loadCharacterData(data);
    },
    error: function(error) {
      console.error('Ha habido un problema:', error);
    }
  });
}

// Función para cargar los datos personales del personaje
function loadCharacterData(data) {
  const characterData = $('#data');
  characterData.empty(); // Limpio el contenido previo

  const characterInfo = $('<div class="character-info"></div>');

  // Muestro los datos específicos de la API que yo quiero
  const name = $('<h2></h2>').text(data.name);
  const height = $('<p></p>').text(`Altura: ${data.height}`);
  const mass = $('<p></p>').text(`Peso: ${data.mass}`);
  const hairColor = $('<p></p>').text(`Color de pelo: ${data.hair_color}`);
  const skinColor = $('<p></p>').text(`Color de piel: ${data.skin_color}`);
  const eyeColor = $('<p></p>').text(`Color de ojos: ${data.eye_color}`);
  const birthYear = $('<p></p>').text(`Años de nacimiento: ${data.birth_year}`);
  const gender = $('<p></p>').text(`Género: ${data.gender}`);

  characterInfo.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
  characterData.append(characterInfo);
}

// Función para cargar los datos del planeta
function fetchPlanetData(url) {
  $.ajax({
    url: url,
    method: 'GET',
    success: function(data) {
      console.log(data);

      const characterData = $('#data');
      characterData.empty();

      const planetInfo = $('<div class="planet-info"></div>');

      const name = $('<h2></h2>').text(data.name);
      const rotationPeriod = $('<p></p>').text(`Periodo de rotación: ${data.rotation_period}`);
      const orbitalPeriod = $('<p></p>').text(`Periodo orbital: ${data.orbital_period}`);
      const diameter = $('<p></p>').text(`Diámetro: ${data.diameter}`);
      const climate = $('<p></p>').text(`Clima: ${data.climate}`);
      const gravity = $('<p></p>').text(`Gravedad: ${data.gravity}`);
      const terrain = $('<p></p>').text(`Terreno: ${data.terrain}`);
      const surfaceWater = $('<p></p>').text(`Superficie del agua: ${data.surface_water}`);
      const population = $('<p></p>').text(`Población: ${data.population}`);

      planetInfo.append(name, rotationPeriod, orbitalPeriod, diameter, climate, gravity, terrain, surfaceWater, population);
      characterData.append(planetInfo);
    },
    error: function(error) {
      console.error('Ha habido un problema:', error);
    }
  });
}

// Función para cargar los datos de las películas
function fetchFilmData(filmUrls) {
  const filmPromises = filmUrls.map(url => $.ajax({ url: url }));

  $.when.apply($, filmPromises)
    .then(function() {
      const films = [...arguments].map(arg => arg[0]);
      console.log(films);

      const characterData = $('#data');
      characterData.empty();

      const filmsInfo = $('<div class="films-info"></div>');
      const titleHeader = $('<h2>Aparición en Películas</h2>');
      const filmsList = $('<ul class="films-list"></ul>');

      films.forEach(function(film) {
        const filmItem = $('<li></li>');
        const filmTitle = $('<p></p>').text(`Título: ${film.title}`);
        const episodeId = $('<p></p>').text(`Episodio: ${film.episode_id}`);
        const director = $('<p></p>').text(`Director: ${film.director}`);
        const producer = $('<p></p>').text(`Productor: ${film.producer}`);
        const releaseDate = $('<p></p>').text(`Fecha de Lanzamiento: ${film.release_date}`);

        filmItem.append(filmTitle, episodeId, director, producer, releaseDate);
        filmsList.append(filmItem);
      });

      filmsInfo.append(titleHeader, filmsList);
      characterData.append(filmsInfo);
    })
    .fail(function(error) {
      console.error('Ha habido un problema:', error);
    });
}

// Función para cargar otros datos del personaje
function loadOtherCharacterData(data) {
  if (!data.species.length) {
    data.species.push("https://swapi.dev/api/species/1/");
  }

  const characterData = $('#data');
  characterData.empty();

  const otherData = $('<div class="other-data"></div>');
  let hasContent = false; // Variable para rastrear si hay contenido para mostrar

  // Agrego los datos de los vehículos si existen
  if (data.vehicles.length > 0) {
    hasContent = true; // Hay contenido para mostrar
    const vehiclesInfo = $('<div class="vehicles-info"></div>');
    const vehiclesTitle = $('<h3>Vehículos</h3>');

    data.vehicles.forEach(function(vehicleUrl) {
      $.ajax({
        url: vehicleUrl,
        method: 'GET',
        success: function(vehicleData) {
          const vehicleItem = $('<div class="vehicle-item"></div>');
          const name = $('<p></p>').text(`Nombre: ${vehicleData.name}`);
          const model = $('<p></p>').text(`Modelo: ${vehicleData.model}`);

          vehicleItem.append(name, model);
          vehiclesInfo.append(vehicleItem);
        },
        error: function(error) {
          console.error('Ha habido un problema:', error);
        }
      });
    });

    otherData.append(vehiclesTitle, vehiclesInfo);
  }

  // Agrego los datos de los starships si existen
  if (data.starships.length > 0) {
    hasContent = true; // Hay contenido para mostrar
    const starshipsInfo = $('<div class="starships-info"></div>');
    const starshipsTitle = $('<h3>Starships</h3>');

    data.starships.forEach(function(starshipUrl) {
      $.ajax({
        url: starshipUrl,
        method: 'GET',
        success: function(starshipData) {
          const starshipItem = $('<div class="starship-item"></div>');
          const name = $('<p></p>').text(`Nombre: ${starshipData.name}`);
          const model = $('<p></p>').text(`Modelo: ${starshipData.model}`);

          starshipItem.append(name, model);
          starshipsInfo.append(starshipItem);
        },
        error: function(error) {
          console.error('Ha habido un problema:', error);
        }
      });
    });

    otherData.append(starshipsTitle, starshipsInfo);
  }

  // Mostrar los datos solo si hay contenido
  if (hasContent) {
    characterData.append(otherData);
  }

  // Obtener datos de especies
  data.species.forEach(function(speciesUrl) {
    $.ajax({
      url: speciesUrl,
      method: 'GET',
      success: function(speciesData) {
        const speciesTitle = $('<h3>Especie</h3>');
        const speciesInfo = $('<div class="species-info"></div>');

        const speciesName = $('<p></p>').text(`Tipo: ${speciesData.name}`);
        const classification = $('<p></p>').text(`Clasificación: ${speciesData.classification}`);
        const designation = $('<p></p>').text(`Designación: ${speciesData.designation}`);
        const averageHeight = $('<p></p>').text(`Altura media: ${speciesData.average_height}`);
        const skinColors = $('<p></p>').text(`Colores de piel: ${speciesData.skin_colors}`);
        const hairColors = $('<p></p>').text(`Colores de pelo: ${speciesData.hair_colors}`);
        const eyeColors = $('<p></p>').text(`Colores de ojos: ${speciesData.eye_colors}`);
        const averageLifespan = $('<p></p>').text(`Promedio de vida: ${speciesData.average_lifespan}`);
        const language = $('<p></p>').text(`Lenguaje: ${speciesData.language}`);

        speciesInfo.append(speciesName, classification, designation, averageHeight, skinColors, hairColors, eyeColors, averageLifespan, language);
        otherData.append(speciesTitle, speciesInfo);
      },
      error: function(error) {
        console.error('Ha habido un problema:', error);
      }
    });
  });

  characterData.append(otherData);
}

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

rain(80); // Genera x gotas de lluvia, solo hay que cambiar el parámetro de dentro
