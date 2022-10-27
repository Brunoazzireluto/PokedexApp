
const pokeApi = {}

function verifyGeneration(gameVersion) {
    if (gameVersion == 'red') {
        return 1
    } else if (gameVersion == 'gold'){
        return 2
    } else if (gameVersion == 'ruby'){
        return 3
    } else if (gameVersion == 'diamond'){
        return 4
    } else if (gameVersion == 'black'){
        return 5
    } else {
        return '6+'
    }
}


function convertPokeApiToPokeModel(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.gen = verifyGeneration(pokeDetail.game_indices[0].version.name)

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToPokeModel)
}

pokeApi.getPokemons = function(offset=0, limit=12){
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetail) => pokemonsDetail)
        .catch((error) => console.log(error))
}

pokeApi.getPokemon = function(id=1){
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokeApi.getPokemonDetail)
        .then((pokemonsDetail) => pokemonsDetail)
        .catch((error) => console.log(error))

}