// IIFE start
var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Add pokemon function
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Pull pokemon function
  function getAll() {
    return pokemonList;
  }

  // Function for adding pokemon to list
  function addListItem(pokemon) {
    var $pokeList = $('.pokeList');
    var $pokeButton = $('<button type="button" class = "pokeButton btn btn-lg button-class list-group-item text-center" data-target="#pokeModal" data-toggle="modal">'
    + pokemon.name + '</button>');

    var $pokeItem = $("<li></li>");

    $($pokeItem).append($pokeButton);
    $pokeList.append($pokeItem);
    $pokeButton.on('click', function() {
      showDetails(pokemon);
    });
  }

  // Show Details Function
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
      });
    }

  // Load pokemon from API
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (item) {
      $.each(item.results, function(index, item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
        console.error(e);
    });
  }

  // Function to load details
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, {dataType: 'json'}).then(function (details) {
      return details;
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      //item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Show Modal function
  function showModal(item) {
    var $modalBody = $('.modal-body');
    var $modalTitle = $('.modal-title');
    $modalBody.empty();
    $modalTitle.empty();

    var $pokeName = $('<h1>' + item.name + '</h1>');
    var $pokeHeight = $('<h3>' + 'Height: ' + item.height + 'm' + '</h3>');
    var $pokePic = $('<img class="pokePic">');
    $pokePic.attr('src', item.imageUrl);
    var $pokeType = $('<h3>' + 'Types: ' + item.types + '</h3>');

    $modalTitle.append($pokeName);
    $modalBody.append($pokePic);
    $modalBody.append($pokeHeight);
    $modalBody.append($pokeType);
    }

  // create hideModal function
/*  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
  }

  var modalContainer = $('#modal-container');
  $(modalContainer).on('click', function (event) {
    var target = $(event.target);
    console.log(target + '' + modalContainer)
    if(target.is(modalContainer)) {
      hideModal();
    }
  });

  var modalContainer = $('#modal-container');
  $(document).keydown(function (event) {
    if (event.keyCode == 27) {
      hideModal();
    }
  });
*/
  // IIFE return Function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
    //hideModal: hideModal
  };
})();

// Create pokeList with buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
  });
