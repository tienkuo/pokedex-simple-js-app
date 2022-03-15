//IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {
    name: "Bulbasaur",
    height: 0.7,
    types: ['grass', 'poison']
    },

    {
      name: "Moltres",
      height: 2,
      types: ['fire', 'flying']
    },

    {
      name: "Dialga",
      height: 5.4,
      types: ['dragon', 'steel']
    },

    {
      name: "Qwilfish",
      height: 0.5,
      types: ['water', 'poison']
    }
  ];
//public function
  function add(pokemon) {
    if ((typeof pokemon === 'object') &&
    (Object.keys(pokemon).includes("name","height","types"))){
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
    pokemonRepository.ifPokemonSelected(button,pokemon); //Invoke the function to add event listener
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function ifPokemonSelected(button,pokemon) {
    //add event listener to the pokemon button
    button.addEventListener('click', function(event) {
      //invoke the showdetails function once the button is clicked
      pokemonRepository.showDetails(pokemon);
  });
  }

  return {
    add: add,
    filter: filter,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    ifPokemonSelected: ifPokemonSelected
  };
})();

//add one pokemon
// pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

//updated forEach loop
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
