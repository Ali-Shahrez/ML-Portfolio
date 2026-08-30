// Fallback email links (.cta-fallback, footer) copy the address to the
// clipboard on click, in addition to attempting mailto:. This means the
// fallback still works on machines with no default mail client configured,
// which was the whole point of adding it.
document.addEventListener('DOMContentLoaded', function () {
  var EMAIL = 'shahrez375@gmail.com';
  var links = document.querySelectorAll('.cta-fallback a, .foot-meta a');

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      var original = link.textContent;
      navigator.clipboard.writeText(EMAIL).then(function () {
        link.textContent = 'Copied to clipboard';
        setTimeout(function () {
          link.textContent = original;
        }, 1600);
      }).catch(function () {
        // Clipboard API unavailable or blocked — mailto: link still works
        // as the primary action, and the address is still visible to copy
        // by hand as a last resort.
      });
    });
  });
});
