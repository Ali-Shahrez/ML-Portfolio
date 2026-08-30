// Submits the #contact form to Netlify Forms over AJAX (fetch), so a
// successful submission shows an inline message instead of navigating the
// visitor away from the page. Netlify detects the static <form
// data-netlify="true"> markup at deploy time and creates the backend that
// receives this POST — nothing else needs to be running for this to work.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successMsg = document.getElementById('form-success');
  var errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot: if this hidden field got filled in, it was a bot, not a
    // person. Silently pretend it worked and stop, rather than let spam
    // reach the inbox this feature exists to protect.
    var honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) {
      form.hidden = true;
      successMsg.hidden = false;
      return;
    }

    var data = new FormData(form);
    var submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Form submission failed: ' + response.status);
        form.hidden = true;
        successMsg.hidden = false;
      })
      .catch(function () {
        errorMsg.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = "Send — I'll reply directly";
      });
  });
});
