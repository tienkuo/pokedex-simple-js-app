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


for (let i=0; i < pokemonList.length; i++) {
  const pokeIndex = `${pokemonList[i].name} (height: ${pokemonList[i].height});`
  if (pokemonList[i].height > 5) {
    document.write('<p>' + pokeIndex + ' - Wow, that\'s big!</p>');
  }else{
    document.write('<p>' + pokeIndex + '</p>');
  }
}
