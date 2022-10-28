const pokemonList = document.getElementById('pokemonList');

function loadPokemonItens(id) {
    getPokemon(id).then((pokemon) => {
        pokemonList.innerHTML =  `<div class="pokemon ${pokemon.type+'-background'}">
        <div class="header">
            <span class="gen">Gen ${pokemon.gen}</span>
            <span class="number">#${pokemon.number}</span>
        </div>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <img src="${pokemon.photo}"
        alt="${pokemon.name}">
        <div class="details">
            <h2>Info</h2>
            <ol class="infoList">
                <li class="infoDetail">height:  ${pokemon.height*10} cm</li>
                <li class="infoDetail">weight:  ${pokemon.weight}Kg</li>
            </ol>
            <h3> description</h3>
            <p>${pokemon.description}</p>
        </div>
    </div>
    `
    });
};

loadPokemonItens(1)



function getDescription(id){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody)
        .then((pokemon) => console.log(pokemon.flavor_text_entries[0].flavor_text))
        
              
}



function convertPokeApiToPokeModel(pokeDetail) {
    const pokemon = new PokemonDetails()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.gen = verifyGeneration(pokeDetail.game_indices[0].version.name)
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    pokemon.description = getDescription(pokeDetail.id)
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    console.log(pokemon)
    return pokemon
}

function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody)
        .then((pokemon) => convertPokeApiToPokeModel(pokemon))

};

