//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; //limit to 20 to reduce loading time

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
    let pokemonListItem = document.createElement('div');
    pokemonListItem.classList.add('group-list-item'); //add bootstrap class
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon', 'btn'); //add class name to button
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    pokemonRepository.handleButtonClick(button,pokemon); //Invoke the function to add event listener
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }
//after click on pokemon button,load the data of pokemon from server
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, pokemon.height, pokemon.imgUrl);
    });
  }

  function showModal(name, height, imgUrl) {

    //add new modal content: modal-close button, h1, p, img
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    modalTitle.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "height: " + height;
    let imgElement = document.createElement('img');
    imgElement.src = imgUrl;

    //append element to parent-modalBody
    modalBody.appendChild(contentElement);
    modalBody.appendChild(imgElement);
    //add className to modalContainer so styles can apply
  }

  function handleButtonClick(button,pokemon) {
    //add event listener to the pokemon button
    button.addEventListener('click', function(event) {
      //invoke the showdetails function once the button is clicked
      showDetails(pokemon);
    });
  }
//load lost of pokemon from apiUrl
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: capitalizeFirstLetter(item.name),
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
//load data of each pokemon when click on pokemon
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
    loadingMessage.removeAttribute('style', 'display:none');
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.setAttribute('style', 'display:none');
  }

  //function to capitalize first letter of e.g. pokemon name
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
