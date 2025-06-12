
document.addEventListener('DOMContentLoaded', function () {
  // ensure action buttons sit inside each review card
  document.querySelectorAll('.response-actions').forEach(function(actions) {
    var review = actions.previousElementSibling;
    while (review && !review.classList.contains('review')) {
      review = review.previousElementSibling;
    }
    if (review) {
      review.appendChild(actions);
      if (!review.querySelector('.review-response')) {
        var toggle = actions.querySelector('.toggle-response');
        if (toggle) toggle.style.display = 'none';
      }
    }
  });

  document.querySelectorAll('.toggle-response').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.closest('.meta-data');
      if (!container) {
        var card = btn.closest('.review');
        if (card) container = card.querySelector('.meta-data');
      }
      if (!container) return;
      var response = container.querySelector('.review-response');
      if (response) {
        response.classList.toggle('visible');
      }
    });
  });

  document.querySelectorAll('.share-button, .page-share').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({ url: location.href }).catch(function(){});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href);
      }
    });
  });

  document.querySelectorAll('.access-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('invert-colors');
    });
  });

  var menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      var links = document.querySelector('.header-links');
      if (links) links.classList.toggle('open');
    });
  }

  document.querySelectorAll('.search-part').forEach(function(searchPart) {
    var searchIcon = searchPart.querySelector('.search-icon');
    var searchInput = searchPart.querySelector('input[type="search"]');
    if (searchIcon && searchInput) {
      searchIcon.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) {
          e.preventDefault();
          searchPart.classList.toggle('expanded');
          if (searchPart.classList.contains('expanded')) {
            searchInput.focus();
          }
        }
      });
    }
  });
});

