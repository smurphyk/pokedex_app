// IIFE start
var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.com/api/v2/pokemon/?limit=150';
  var$modalContainer = $('#modal-container');
  var $pokeList = $('.pokeList');

  // Add pokemon function
  function add(pokemon) {
    pokemonRepository.push(pokemon);
  }

  // Pull pokemon function
  function getAll() {
    return pokemonList;
  }

  // Function for adding pokemon to list
  function addListItem(pokemon) {
    var $pList = $('.pokeList');
    var $pokeItem = $('<li class = "pokeItem"></li>');
    var $button = $('<button class = "pokeButton">' + pokemon.name + '</button>');

    $(pList).append($pokeItem);
    $(pokeItem).append($button);
    $(button).html(pokemon.name);
    $button.on('click', function() {
      showDetails(pokemon);
    });
  }

  function add(name) {
    pokemonList.push(name);
  }

  function catchAll() {
    return pokemonList;
  }

  // Load pokemon from API
  function loadList() {
    return $.ajax(apiURL, {dataType: 'json'}).then(function (item) {
      $.each(item.results, function(index, item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
        console.error(e);
    });
  }

  // Function to load details
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, {dataType: 'json'}).then(function(details) {
      // Add details to pokeItem
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Show Modal function
  function showModal(item) {
    $modalContainer.html('');
    $modalContainer.addClass('is-visible');

    var $modal = $('<div class="pokemodal"></div>');

    var $closeButton = $('<buton class = "closePokemon"></button>');

    $closeButton.html('X');
    $closeButton.on('click', function(hideModal) {

    var $pokeName = $('h1');
    $pokeName.html(item.name class = 'pokeName');

    var $pokePic = $('img');
    $pokePic.html(item.imageUrl class = 'pokePic');

    var $pokeHeight = $('h3');
    $pokeHeight.html('Height: ' + item.height +'m' class = 'pokeDetails');

    var $pokeType = $('h3');
    $pokeType.html('Type: ' + item.types class = 'pokeDetails');

    $modal.append($closeButton);
    $modal.append($pokePic);
    $modal.append($pokeName);
    $modal.append($pokeHeight);
    $modal.append($pokeType);
    $modalContainer.append($modal);
  }

  function hideModal() {
    var $modalContainer = $('#modal-container' removeClass('is-visible'));
  }

  var $modalContainer.on('click', fucntion(showModal) => {
    ('Title', 'Content');
  });

  // Show Details Function
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      pokemonRepository.showModal(item);
      });
    }

  // IIFE return Function
  return {
    add: add,
    catchAll: catchAll,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Create pokeList with buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(fucntion(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
