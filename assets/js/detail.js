const pokemonList = document.getElementById('pokemonList');

function loadPokemonItens(id) {
    pokeApi.getPokemon(id).then((pokemon) => {
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
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    </div>`
    });
};

loadPokemonItens(1)