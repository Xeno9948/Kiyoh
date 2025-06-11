
document.addEventListener('DOMContentLoaded', function () {
  // ensure action buttons sit inside each review card
  document.querySelectorAll('.response-actions').forEach(function(actions) {
    var review = actions.previousElementSibling;
    while (review && !review.classList.contains('review')) {
      review = review.previousElementSibling;
    }
    if (review) {
      review.appendChild(actions);
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

  document.querySelectorAll('.share-button').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({ url: location.href }).catch(function(){});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href);
      }
    });
  });
});

