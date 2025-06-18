
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.date-span[data-date]').forEach(function(el){
    var d = new Date(el.dataset.date);
    if(!isNaN(d)){
      el.textContent = d.toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'});
    }
  });
  document.querySelectorAll('.review-response-preview').forEach(function(p){
    var txt = p.textContent.trim();
    var m = txt.match(/^(.+?\.)\s*\1(.*)$/);
    if(m){
      p.textContent = m[1] + m[2];
    }
  });
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
      var preview = container.querySelector('.review-response-preview');
      if (response) {
        var visible = response.classList.toggle('visible');
        if (preview) preview.style.display = visible ? 'none' : '';
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
      document.body.classList.toggle('dark-mode');
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

  var applyBtn = document.querySelector('.js-filter-button');
  if (applyBtn) {
    document.querySelectorAll('.js-sorting-fields, .js-language-filter, .js-rating-stars .js-star').forEach(function(el) {
      el.addEventListener('change', function() {
        applyBtn.click();
      });
    });
  }

  document.querySelectorAll('.contact-actions a[href^="tel:"]').forEach(function(link) {
    if (!link.getAttribute('href').replace('tel:', '').trim()) {
      link.style.display = 'none';
    }
  });

  var mapSquare = document.querySelector('.map-square');
  if (mapSquare && window.matchMedia('(max-width: 767px)').matches) {
    var iframe = mapSquare.querySelector('iframe');
    var overlay = mapSquare.querySelector('.map-overlay');
    if (iframe && overlay) {
      var hold;
      function activate() {
        overlay.classList.add('hidden');
        iframe.style.pointerEvents = 'auto';
      }
      function startHold() {
        hold = setTimeout(activate, 600);
      }
      function cancelHold() {
        clearTimeout(hold);
      }
      overlay.addEventListener('touchstart', startHold);
      overlay.addEventListener('mousedown', startHold);
      overlay.addEventListener('touchend', cancelHold);
      overlay.addEventListener('mouseup', cancelHold);
    }
  }
});

