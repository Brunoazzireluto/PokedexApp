const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore');
const limit = 12;
let offset = 0;
const maxRecords = 650


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
   
        pokemonList.innerHTML +=  pokemons.map((pokemon) => `<a class="detailLink" href="/details.html?id=${pokemon.number}"><li class="pokemon ${pokemon.type+'-background'}">
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
    </li></a>`).join('')
    });
};

loadPokemonItens(offset, limit)

    
loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset +limit
    if (qtdRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }

    
} )