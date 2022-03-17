//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

//public function
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
    "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function filter(name) {
    return pokemonList.filter(pokemonList => pokemonList.name === name);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon'); //add class name to button
    pokemonRepository.handleButtonClick(button,pokemon); //Invoke the function to add event listener
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function handleButtonClick(button,pokemon) {
    //add event listener to the pokemon button
    button.addEventListener('click', function(event) {
      //invoke the showdetails function once the button is clicked
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoadingMessage();
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Now add details to the item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.removeAttribute('style', 'display: none');
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.setAttribute('style', 'display: none');
  }

  return {
    add: add,
    filter: filter,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    handleButtonClick: handleButtonClick,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//add one pokemon
// pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

//updated forEach loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
