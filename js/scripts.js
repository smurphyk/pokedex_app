// IIFE start
var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container');
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
    var $pokeItem = $('<li></li>');
    var $button = $('<button class = "pokeButton">' + pokemon.name + '</button>');

    $($pList).append($pokeItem);
    $($pokeItem).append($button);
    $($button).html(pokemon.name);
    $button.on('click', function(event) {
      showDetails(pokemon);
    });
  }

  function add(name) {
    pokemonList.push(name);
  }

  function getAll() {
    return pokemonList;
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
    $modalContainer.html('');
    $modalContainer.addClass('is-visible');

    var $modal = $('<div class="pokemodal"></div>');

    var $closeButton = $('<button></button>');

    $closeButton.html('X');
    $closeButton.addClass('closePokemon');
    $closeButton.on('click', function () {
      hideModal();
    })

    var $pokeName = $('<h1></h1>');
    $pokeName.html(item.name);
    $pokeName.addClass('pokeName');

    var $pokePic = $('<img></img>');
    $pokePic.addClass('pokePic');
    $pokePic.attr('src', item.imageUrl);

    var $pokeHeight = $('<h3></h3>');
    $pokeHeight.html('Height: ' + item.height +'m');
    $pokeHeight.addClass('pokeHeight');

  /*  var $pokeType = $('<h3></h3>');
    $pokeType.html('Type: ' + item.types);
    $pokeType.addClass('pokeType');
    */

    $modal.append($closeButton);
    $modal.append($pokeName);
    $modal.append($pokePic);
    $modal.append($pokeHeight);
    //$modalDetails.append($pokeType);
    $modalContainer.append($modal);
  };

  // Show Details Function
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
      });
    }

  // create hideModal function
  function hideModal() {
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

  // IIFE return Function
  return {
    add: add,
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
  });
