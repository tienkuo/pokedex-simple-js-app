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
    }
  }

  function filter(name) {
    return pokemonList.filter(pokemonList => pokemonList.name === name);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    filter: filter,
    getAll: getAll
  };
})();


//updated forEach loop
pokemonRepository.getAll().forEach(function(pokemon){
  const pokeIndex = `${pokemon.name} (height: ${pokemon.height})`;
  if (pokemon.height > 5) {
    document.write('<p>' + pokeIndex + ' - Wow, that\'s big!</p>');
  }else{
    document.write('<p>' + pokeIndex + '</p>');
  }
})

//test to add a pokemon that is not an object
// pokemonRepository.add("bird");
// console.log(pokemonRepository.getAll())
//test to add a pokemon that is a object
// pokemonRepository.add({name: 'Blastoise', height: 1.6, types:'water'});
// console.log(pokemonRepository.getAll())
// console.log(pokemonRepository.filter('Dialga'))
