//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20'; //limit to 20 to reduce loading time
  let modalContainer = document.querySelector('#modal-container');

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
      showModal(pokemon.name, pokemon.height, pokemon.imgUrl);
    });
  }

  function showModal(name, height, imgUrl) {
    modalContainer.innerHTML = ''; //clear all existing modal content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add new modal content: modal-close button, h1, p, img
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "height: " + height;
    let imgElement = document.createElement('img');
    imgElement.src = imgUrl;

    //append element to parent
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);
    //add className to modalContainer so styles can apply
    modalContainer.classList.add('is-visible');
  }

  //define a hideModal function to close modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //beyond hideModal function, we also want to close modal when the escape key is pressed
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //also when users click anywhere inside the modal-container,
  //except the modal (i.e.close when click outside the modal)
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
