
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.toggle-response').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.closest('.meta-data');
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

