// Who Did Us — shared script.
// Suggest a Case: shows the after-send message. While the form action is
// still the "#" placeholder, the send is simulated client-side only; once
// the deployment stage wires the real backend action, the same handler
// POSTs the form data first and then shows the message.
(function () {
  var form = document.getElementById("suggest-form");
  if (!form) return;
  var thanks = document.getElementById("suggest-thanks");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var action = form.getAttribute("action");
    function done() {
      form.style.display = "none";
      if (thanks) {
        thanks.hidden = false;
        thanks.setAttribute("tabindex", "-1");
        thanks.focus();
      }
      window.scrollTo({ top: form.offsetTop - 90, behavior: "smooth" });
    }
    if (action && action !== "#") {
      fetch(action, { method: "POST", body: new FormData(form), mode: "no-cors" })
        .then(done)
        .catch(done);
    } else {
      done();
    }
  });
})();
